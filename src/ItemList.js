/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios';

const Plot = createPlotlyComponent(Plotly);

function getEntityData(entity_id) {
  return axios.get('https://api.ddsch.com/bulk_items/?entity_id='+entity_id)
      .then((response) => {
        return response.data;
      },
      );
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: add weapon name as state from TODO APIs, e.g. entity_name: 'AK-12',
      // eslint-disable-next-line react/prop-types
      entity: this.props.entity,
      time_frame: [],
      min_price: [],
      count: [],
    };
  }

  componentDidUpdate(prevProps) {
    console.log('plot updated');
    // eslint-disable-next-line react/prop-types
    if (this.props.entity !== prevProps.entity) {
      // eslint-disable-next-line react/prop-types
      console.log('entity_id changed');
      // eslint-disable-next-line react/prop-types
      getEntityData(this.props.entity.entity_id).then((data) => {
        this.setState(
            {
              // TODO: add weapon name as state from TODO APIs, e.g. entity_name: 'AK-12',
              // unix timestamp in JS is calculated by milliseconds
              // eslint-disable-next-line react/prop-types
              entity: this.props.entity,
              time_frame: data.map((x) => x['entity_timestamp']*1000),
              min_price: data.map((x) => x['min_price']),
              count: data.map((x) => x['entity_count']),
            });
      });
    } else {
      console.log('no change on entity_id');
    }
  }

  componentDidMount() {
    console.log('plot mounted');
    // eslint-disable-next-line react/prop-types
    getEntityData(this.props.entity.entity_id).then((data) => {
      this.setState(
          {
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
          },
          {
            name: 'count',
            x: this.state.time_frame,
            y: this.state.count,
            yaxis: 'y2',
            type: 'scatter',
            mode: 'lines',
            marker: {color: '#00a6a0'},
          },
        ]}
        layout={
          {
            width: 1280,
            height: 600,
            // TODO: use API to convert entity_id to real weapon name
            title: this.state.entity.item_id,
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
        config={{responsive: true}}
      />

    );
  }
}

export default ItemList;
