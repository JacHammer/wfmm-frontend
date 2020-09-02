/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Select from 'react-select';
import axios from 'axios';

// eu and ru have different entity_id-item_id mappings so we need to get these mappings when region changes
async function getItemManifest(region) {
  const euManifest = 'https://api.ddsch.com/item_manifest/';
  const ruManifest = 'https://api.ddsch.com/ru/item_manifest/';
  if (region == 'eu') {
    const euResponse = await axios.get(euManifest);
    return euResponse.data;
  } else if (region == 'ru') {
    const ruResponse = await axios.get(ruManifest);
    return ruResponse.data;
  } else {
    const response = await axios.get(ruManifest);
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

  // search bar is mounted for the first time
  componentDidMount() {
    console.log('search bar mounted');
    getItemManifest(this.props.entity.region).then((data) => {
      this.setState(
          {
            entity: {...this.props.entity},
            EntityList: data,
          });
    });
  }

  // either change of region or entity_id will trigger search bar re-rendering
  componentDidUpdate(prevProps, prevState) {
    const prevRegion = prevProps.entity.region;
    const currRegion = this.props.entity.region;
    const prevEntityId = prevProps.entity.entity_id;
    const currEntityId = this.props.entity.entity_id;

    if (prevRegion != currRegion || prevEntityId != currEntityId) {
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
        defaultValue={{region: this.state.entity.region, entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'}}
        name="item manifest"
        isClearable={false}
        options={this.state.EntityList}
        // maping: value: entity_id, label: item_id
        getOptionValue={(option) => option.entity_id}
        getOptionLabel={(option) => option.title_en}
        onChange={this.props.onUserInputChange}
      />
    );
  }
}
