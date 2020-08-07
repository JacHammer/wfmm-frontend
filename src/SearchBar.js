/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Select from 'react-select';
import axios from 'axios';

async function getItemManifest() {
  const response = await axios.get('https://api.ddsch.com/item_manifest/');
  return response.data;
}

export default class SingleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentEntityId: undefined,
      EntityList: [],

    };
  }

  componentDidMount() {
    console.log('Search bar mounted');
    getItemManifest().then((data) => {
      this.setState(
          {
            EntityList: data,
          });
    });
  }

  render() {
    return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={{entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'}}
        name="item manifest"
        isClearable={false}
        options={this.state.EntityList}
        // maping: value: entity_id, label: item_id
        getOptionValue={(option) => option.entity_id}
        getOptionLabel={(option) => option.title_en}

        // eslint-disable-next-line react/prop-types
        onChange={this.props.onUserInputChange}
      />
    );
  }
}
