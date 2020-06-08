/* eslint-disable require-jsdoc */
import React from 'react';
import Select from 'react-select';

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
    this.setState(
        {
          CurrentEntityId: undefined,
          SampleEntityId: [
            {value: '6253', label: '6253'},
            {value: '6243', label: '6243'},
            {value: '6209', label: '6209'},
            {value: '6241', label: '6241'},
          ],
        },
    );
  }

  render() {
    return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={{value: '6255', label: '6255'}}
        name="color"
        isClearable={true}
        options={this.state.SampleEntityId}
        // eslint-disable-next-line react/prop-types
        onChange={this.props.onUserInputChange}
      />
    );
  }
}
