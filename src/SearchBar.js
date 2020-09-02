/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Select from 'react-select';
import axios from 'axios';

async function getItemManifest(region) {
  // const response = await axios.get('https://api.ddsch.com/ru/item_manifest/');
  if (region == 'eu') {
    const response = await axios.get('https://api.ddsch.com/item_manifest/');
    return response.data;
  } else if (region == 'ru') {
    const response = await axios.get('https://api.ddsch.com/ru/item_manifest/');
    return response.data;
  } else {
    const response = await axios.get('https://api.ddsch.com/item_manifest/');
    return response.data;
  }
}

export default class SingleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: {...this.props.entity},
      EntityList: [],

    };
  }

  componentDidMount() {
    console.log('Search bar mounted');
    getItemManifest(this.props.entity.region).then((data) => {
      this.setState(
          {
            entity: {...this.props.entity},
            EntityList: data,
          });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevRegion = prevProps.entity.region;
    const currRegion = this.props.entity.region;
    const prevEntityId = prevProps.entity.entity_id;
    const currEntityId = this.props.entity.entity_id;
    console.log('Search bar starts updating');
    if (prevRegion != currRegion || prevEntityId != currEntityId) {
      console.log(`${this.state.entity.region}, ${prevState.entity.region}`);
      return getItemManifest(this.props.entity.region)
          .then((data) => {
            this.setState(
                {
                  entity: {...this.props.entity},
                  EntityList: data,
                });
          });
    };
  }

  render() {
    return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        // defaultValue={{entity_id: '4590', item_id: 'ar29_black03skin_shop', title_en: 'AK Alpha Onyx Skin'}}
        defaultValue={{region: this.state.entity.region, entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'}}
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
