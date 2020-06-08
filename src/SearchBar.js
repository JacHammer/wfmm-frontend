/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Select from 'react-select';
import axios from 'axios';

function getItemManifest() {
  return axios.get('http://127.0.0.1:8000/item_manifest/')
      .then((response) => {
        return response.data;
      },
      );
}

export default class SingleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentEntityId: undefined,
      SampleEntityId: [],
    };
  }

  componentDidMount() {
    // TODO: use API to fetch entity_id
    // TODO: use API to convert entity_id to real name
    console.log('Search bar mounted');
    getItemManifest().then((data) => {
      this.setState(
          {
            SampleEntityId: data,
          });
    });
  }

  render() {
    return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={{entity_id: '6255', item_id: 'hmg03_gorgona02_shop'}}
        name="item manifest"
        isClearable={true}
        options={this.state.SampleEntityId}
        // maping: value: entity_id, label: item_id
        getOptionValue={(option) => option.entity_id}
        getOptionLabel={(option) => option.item_id}

        // eslint-disable-next-line react/prop-types
        onChange={this.props.onUserInputChange}
      />
    );
  }
}
