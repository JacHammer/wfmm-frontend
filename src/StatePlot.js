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

  useEffect(
      // TODO: fetch marketplace status based on props.region
      // and then fetch timestamp and marketState using axios
      (props) => {
        console.log('yea');
      },
      [props],
  );
  return (
    <Plot
      data={[
        {
          name: 'status',
          x: timestamp,
          y: marketState,
          type: 'scatter',
          mode: 'lines',
          marker: {color: '#ea904f'},
          line: {shape: 'hv'},
        },
      ]}
      layout={
        {
          title: `${props.region} Marketplace State`,
          xaxis: {type: 'date'},
          yaxis: {
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
