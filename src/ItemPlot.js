/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios';
import {withSnackbar} from 'notistack';
import {euURL, ruURL, defaultEntityUrl} from './endpoint/Endpoint';

const Plot = createPlotlyComponent(Plotly);

async function getEntityData(entity) {
  if (entity === null || entity === undefined) {
    const default_response = await axios.get(defaultEntityUrl);
    return default_response.data;
  } else if (entity.region == 'eu') {
    const euResponse = await axios.get(euURL + entity.entity_id);
    return euResponse.data;
  } else if (entity.region == 'ru') {
    const ruResponse = await axios.get(ruURL + entity.entity_id);
    return ruResponse.data;
  } else {
    console.log(`Entity received but region is not defined: ${entity.region}; ${entity.entity_id}; ${entity.item_id}`);
    const response = await axios.get(euURL + entity.entity_id);
    return response.data;
  }
};

class ItemPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: this.props.entity,
      time_frame: [],
      min_price: [],
      count: [],
    };
  }

  // plot mounted for the first time
  componentDidMount() {
    console.log('plot mounted');
    getEntityData(this.props.entity).then((data) => {
      this.setState(
          {
            // set new entity as plot state
            entity: {...this.props.entity},
            // unix timestamp in JS is calculated by milliseconds
            time_frame: data.map((x) => x['entity_timestamp']*1000),
            min_price: data.map((x) => x['min_price']),
            count: data.map((x) => x['entity_count']),
          });
    });
  }

  // update plot when entity properties except region changed
  componentDidUpdate(prevProps, prevState) {
    const prevEntityId = prevProps.entity.entity_id;
    const currEntityId = this.props.entity.entity_id;
    // update plot if entity_id from the props changed
    if (prevEntityId != currEntityId) {
      this.props.enqueueSnackbar(`Fetching info...`, {variant: 'info'});
      getEntityData(this.props.entity)
          .then((data) => {
            this.setState(
                {
                  // set new entity as plot state
                  entity: {...this.props.entity},
                  // unix timestamp in JS is calculated by milliseconds
                  time_frame: data.map((x) => x['entity_timestamp']*1000),
                  min_price: data.map((x) => x['min_price']),
                  count: data.map((x) => x['entity_count']),
                });
          })
          .then(() => this.props.enqueueSnackbar(`Successfully fetched ${this.state.entity.title_en} from ${this.state.entity.region.toUpperCase()}`, {variant: 'success'}))
          .catch(() => this.props.enqueueSnackbar(`Failed to fetch data`, {variant: 'warning'}));
    };
  }

  render() {
    return (
      <Plot
        data={[
          {
            name: 'price',
            x: this.state.time_frame,
            y: this.state.min_price,
            type: 'scatter',
            mode: 'lines',
            marker: {color: '#ea904f'},
            line: {shape: 'hv'},
          },
          {
            name: 'count',
            x: this.state.time_frame,
            y: this.state.count,
            yaxis: 'y2',
            type: 'scatter',
            mode: 'lines',
            marker: {color: '#00a6a0'},
            line: {shape: 'hv'},
          },
        ]}
        layout={
          {
            title: `${this.state.entity.region.toUpperCase()} ${this.state.entity.title_en}`,
            xaxis: {type: 'date'},
            yaxis: {
              title: 'min_price (K)',
              titlefont: {color: '#ea904f'},
              tickfont: {color: '#ea904f'},
            },
            yaxis2: {
              title: 'count',
              titlefont: {color: '#00a6a0'},
              tickfont: {color: '#00a6a0'},
              overlaying: 'y',
              side: 'right',
            },
            showlegend: true,
            autosize: true,
            images: [
              {
                x: 1,
                y: 1.05,
                sizex: 0.2,
                sizey: 0.2,
                source: `https://wf.cdn.gmru.net/static/wf.mail.ru/img/main/items/${this.state.entity.item_id}.png`,
                xanchor: 'right',
                xref: 'paper',
                yanchor: 'bottom',
                yref: 'paper',
              },
            ],
          }
        }
        style={{width: '100%', height: '100%'}}
        useResizeHandler= {true}
        config={{responsive: true}}
      />

    );
  }
}

export default withSnackbar(ItemPlot);
