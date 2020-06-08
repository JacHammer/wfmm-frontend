/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios';

const Plot = createPlotlyComponent(Plotly);

function getEntityData(entity_id) {
  return axios.get('http://127.0.0.1:8000/bulk_items/?entity_id='+entity_id)
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
      entity_id: this.props.entity_id,
      time_frame: [],
      min_price: [],
      count: [],
    };
  }

  componentDidUpdate(prevProps) {
    console.log('plot updated');
    // eslint-disable-next-line react/prop-types
    if (this.props.entity_id !== prevProps.entity_id) {
      // eslint-disable-next-line react/prop-types
      console.log('entity_id changed');
      // eslint-disable-next-line react/prop-types
      getEntityData(this.props.entity_id).then((data) => {
        this.setState(
            {
              // TODO: add weapon name as state from TODO APIs, e.g. entity_name: 'AK-12',
              // unix timestamp in JS is calculated by milliseconds
              // eslint-disable-next-line react/prop-types
              entity_id: this.props.entity_id,
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
    getEntityData(this.props.entity_id).then((data) => {
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
            title: this.state.entity_id,
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
          }
        }
        config={{responsive: true}}
      />

    );
  }
}

export default ItemList;
