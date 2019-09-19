import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button, Input, Message, TextArea } from 'semantic-ui-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import TableauReport from '~/components/theme/TableauView/TableauReport';

// const url = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms';
// const messages = defineMessages({
//     ChartTile: {
//       id: 'Enter chart data',
//       defaultMessage: 'Enter chart data',
//     },
//   });

class StackedBarChart extends Component {
  // static propTypes = {
  //     selected: PropTypes.bool.isRequired,
  //     tile: PropTypes.string.isRequired,
  //     index: PropTypes.number.isRequired,
  //     data: PropTypes.objectOf(PropTypes.any).isRequired,
  //     pathname: PropTypes.string.isRequired,
  //     onChangeTile: PropTypes.func.isRequired,
  //     onSelectTile: PropTypes.func.isRequired,
  //     onDeleteTile: PropTypes.func.isRequired,
  //     onFocusPreviousTile: PropTypes.func.isRequired,
  //     onFocusNextTile: PropTypes.func.isRequired,
  //     handleKeyDown: PropTypes.func.isRequired,
  //     intl: intlShape.isRequired,
  // };

  constructor(props) {
    super(props);

    const data = this.props.data.tableauData || {};
    let show = !__SERVER__ && data ? true : false;

    let filters = data.filters && data.sheetname ? data.filters[data.sheetname] : {};

    this.state = {
      show,
      tableauData: data,
      url: data.url || '',
      filters,
      sheetname: data.sheetname || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.saveCallback = this.saveCallback.bind(this);
  }

  handleChange(e) {
    let data = e.target.value;
    try {
      data = e.target.value;
      this.setState(
        {
          url: data,
        },
        this.onSubmit,
      );
    } catch {
      console.warning('Invalid JSON data: ', data);
    }
  }

  onSubmit() {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      tableauData: this.state.tableauData,
    });
  }

  saveCallback(saveData) {
    console.log("Received save data", saveData);
    let stateData = JSON.parse(JSON.stringify(this.state));
    this.setState({
      tableauData: saveData
    }, this.onSubmit)
  }

  getChartData() {
    let tableauData = this.state.tableauData;
    if (typeof tableauData == 'string') {
      try {
        tableauData = tableauData;
      } catch (error) {
        console.log(error);
        tableauData = {};
      }
    }
    console.log(tableauData);
    return tableauData;
  }

  render() {
    if (__SERVER__) return '';
    // const TableauReport = require('tableau-react');
    console.log(this.state);
    return (
      <div className="tile chartWrapperEdit">
        <div className="tile-inner-wrapper">
          {this.state.show && this.state.url ? (
            <div className="image-add">
              <ResponsiveContainer>
                <TableauReport
                  url={this.state.url}
                  filters={this.state.filters}
                  sheetname={this.state.sheetname}
                  callback={this.saveCallback}
                />
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="image-add">
              <div class="ui segment">
                <div class="ui placeholder">
                  <div class="image header">
                    <div class="line" />
                    <div class="line" />
                  </div>
                  <div class="paragraph">
                    <div class="medium line" />
                    <div class="short line" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            <label>Enter JSON data</label>
            <input
              type="text"
              defaultValue={this.state.url}
              placeholder="Enter tableau URL"
              onChange={this.handleChange}
            />
            <Button
              onClick={() =>
                this.setState({ show: true })
              }
            >
              Show dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default StackedBarChart;