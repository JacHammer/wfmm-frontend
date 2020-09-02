/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios';

const Plot = createPlotlyComponent(Plotly);

async function getEntityData(entity) {
  if (entity === null || entity === undefined) {
    // const default_response = await axios.get('https://api.ddsch.com/ru/bulk_items/?entity_id=3897');
    console.log('Entity not specified');
    const default_response = await axios.get('https://api.ddsch.com/bulk_items/?entity_id=3897');
    return default_response.data;
  } else if (entity.region == 'eu') {
    // const response = await axios.get('https://api.ddsch.com/ru/bulk_items/?entity_id=' + entity.entity_id);
    const response = await axios.get('https://api.ddsch.com/bulk_items/?entity_id=' + entity.entity_id);
    return response.data;
  } else if (entity.region == 'ru') {
    // const response = await axios.get('https://api.ddsch.com/ru/bulk_items/?entity_id=' + entity.entity_id);
    const response = await axios.get('https://api.ddsch.com/ru/bulk_items/?entity_id=' + entity.entity_id);
    return response.data;
  } else {
    console.log(`OUTSIDE LOOP! ${entity.region} ${entity.entity_id} ${entity.item_id}`);
    const response = await axios.get('https://api.ddsch.com/bulk_items/?entity_id=' + entity.entity_id);
    return response.data;
  }
};


class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: this.props.entity,
      time_frame: [],
      min_price: [],
      count: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`When plot updated, curr props region is: ${this.props.entity.region}`);
    const prevEntityId = prevProps.entity.entity_id;
    const currEntityId = this.props.entity.entity_id;
    if (prevEntityId != currEntityId) {
      getEntityData(this.props.entity)
          .then((data) => {
            this.setState(
                {
                  // unix timestamp in JS is calculated by milliseconds
                  entity: {...this.props.entity},
                  time_frame: data.map((x) => x['entity_timestamp']*1000),
                  min_price: data.map((x) => x['min_price']),
                  count: data.map((x) => x['entity_count']),
                });
          });
    };
  }

  componentDidMount() {
    console.log('plot mounted');
    getEntityData(this.props.entity).then((data) => {
      this.setState(
          {
            entity: this.props.entity,
            // unix timestamp in JS is calculated by milliseconds
            time_frame: data.map((x) => x['entity_timestamp']*1000),
            min_price: data.map((x) => x['min_price']),
            count: data.map((x) => x['entity_count']),
          });
    });
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
            title: `${this.state.entity.region} ${this.state.entity.title_en}`,
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

export default ItemList;
