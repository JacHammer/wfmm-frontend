/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import {useEffect, useState} from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import {ruMarketState, euMarketState} from './endpoint/Endpoint';
import axios from 'axios';

function StatePlot(props) {
  const Plot = createPlotlyComponent(Plotly);
  const [timestamp, setTimestamp] = useState([]);
  const [marketState, setMarketState] = useState([]);
  const [errorList, setErrorList] = useState([]);


  // fetch marketpalce status data from endpoint
  async function fetchMarketStatus(region) {
    const response = await axios.get(
      region == 'eu' ?
      euMarketState :
      region == 'ru' ?
      ruMarketState :
      euMarketState);
    return response.data;
  };


  useEffect(
      // TODO: fetch marketplace status based on props.region
      // and then fetch timestamp and marketState using axios
      () => {
        console.log(props.region);
        fetchMarketStatus(props.region).then((data) => {
          console.log(data);
          setTimestamp(data.map((x) => x['market_timestamp']*1000));
          setMarketState(data.map((x) => x['market_http_code']));
        });
      },
      [props.region],
  );
  return (
    <Plot
      data={[
        {
          name: 'status',
          x: [
            1601189527,
            1601189532,
            1601189537,
            1601189542,
            1601189547,
            1601189552,
            1601189557,
            1601306785,
            1601306790,
            1601306795,
          ].map((x)=>x*1000),
          y: ['OK', 'Degraded', 'Down', 'OK', 'Degraded', 'Down', 'OK', 'Degraded', 'Down', 'OK'],
          type: 'scatter',
          mode: 'lines',
          marker: {color: '#ea904f'},
          line: {shape: 'vh'},
        },
      ]}
      layout={
        {
          title: `${props.region} Marketplace State`,
          xaxis: {type: 'date'},
          yaxis: {
            categoryorder: 'array',
            categoryarray: ['Down', 'Degraded', 'OK'],
            title: 'state',
            titlefont: {color: '#ea904f'},
            tickfont: {color: '#ea904f'},
          },
          showlegend: true,
          autosize: true,
        }
      }
      style={{width: '100%', height: '100%'}}
      useResizeHandler= {true}
      config={{responsive: true}}
    />

  );
}

export default StatePlot;
