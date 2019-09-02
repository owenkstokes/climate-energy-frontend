/**
 * Edit container.
 * @module components/manage/Edit/Edit
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { defineMessages, injectIntl, intlShape } from 'react-intl';
// import { Portal } from 'react-portal';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// import qs from 'query-string';

// import { Form, Icon, Toolbar, Sidebar } from '@plone/volto/components';
// import { updateContent, getContent, getSchema } from '@plone/volto/actions';
// import { getBaseUrl, hasTilesData } from '@plone/volto/helpers';

// import saveSVG from '@plone/volto/icons/save.svg';
// import clearSVG from '@plone/volto/icons/clear.svg';


// import { Mosaic } from 'react-mosaic-component';
// import '@blueprintjs/core/lib/css/blueprint.css';
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'react-mosaic-component/react-mosaic-component.css';
import { Classes, HTMLSelect } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import dropRight from 'lodash/dropRight';
import EditText from '@plone/volto/components/manage/Tiles/Tile/Edit'

import {
  Corner,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicWindow,
  MosaicZeroState,
  updateTree,
} from 'react-mosaic-component';

// import { CloseAdditionalControlsButton } from './CloseAdditionalControlsButton';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
// import '../styles/index.less';
// import './example.less';

// tslint:disable no-console

// tslint:disable-next-line no-var-requires
// const gitHubLogo = require('./GitHub-Mark-Light-32px.png');
// tslint:disable-next-line no-var-requires
// const { version } = require('../package.json');

let windowCount = 3;

export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
  ['None']: '',
};

// export type Theme = keyof typeof THEMES;


// const additionalControls = React.Children.toArray([<CloseAdditionalControlsButton />]);

const EMPTY_ARRAY = [];

// export interface ExampleAppState {
//   currentNode: MosaicNode<number> | null;
//   currentTheme: Theme;
// }

export default class ExampleApp extends Component {

  constructor(props) {
    super(props);
    
    if (!__SERVER__) {
      this.state = {
        currentNode: 1,
        currentTheme: 'Blueprint',
      };
    }

    // this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div>
        <div className="react-mosaic-example-app">
          {this.renderNavBar()}
          <Mosaic
            renderTile={(count, path) => (
              <MosaicWindow
                // <number>
                // additionalControls={count === 3 ? additionalControls : EMPTY_ARRAY}
                title={`Window ${count}`}
                createNode={this.createNode}
                path={path}
                onDragStart={() => console.log('MosaicWindow.onDragStart')}
                onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
                renderToolbar={count === 2 ? () => <div className="toolbar-example">Custom Toolbar</div> : null}
              >
                <EditText/>
              </MosaicWindow>
            )}
            zeroStateView={<MosaicZeroState createNode={this.createNode} />}
            value={this.state.currentNode}
            onChange={this.onChange}
            onRelease={this.onRelease}
            className={THEMES[this.state.currentTheme]}
          />
     
        </div>
      </div>
    );
  }

  // onChange = (currentNode: MosaicNode<number> | null) => {
  //   this.setState({ currentNode });
  // };

  onChange = (currentNode) => {
    this.setState({ currentNode });
  };

  onRelease = (currentNode) => {
    console.log('Mosaic.onRelease():', currentNode);
  };

  createNode = () => ++windowCount;

  autoArrange = () => {
    const leaves = getLeaves(this.state.currentNode);

    this.setState({
      currentNode: createBalancedTreeFromLeaves(leaves),
    });
  };

  addToTopRight = () => {
    let { currentNode } = this.state;
    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      // const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<number>;

      const parent = getNodeAtPath(currentNode, dropRight(path));
      // const destination = getNodeAtPath(currentNode, path) as MosaicNode<number>;

      const destination = getNodeAtPath(currentNode, path);
      const direction = parent ? getOtherDirection(parent.direction) : 'row';

      let first = destination
      let second = destination
      let third = 3
      if (direction === 'row') {
        first = destination;
        second = ++windowCount;
      } else {
        first = ++windowCount;
        second = destination;
      }

      currentNode = updateTree(currentNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
              third
            },
          },
        },
      ]);
    } else {
      currentNode = ++windowCount;
    }

    this.setState({ currentNode });
  };

  renderNavBar() {
    return (
      <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
        <div className={Classes.NAVBAR_GROUP}>
          <div className={Classes.NAVBAR_HEADING}>
            <a href="https://github.com/nomcopter/react-mosaic">
              react-mosaic <span className="version">v1</span>
            </a>
          </div>
        </div>
        <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
          <label className={classNames('theme-selection', Classes.LABEL, Classes.INLINE)}>
            Theme:
            <HTMLSelect
              value={this.state.currentTheme}
              // onChange={(e) => this.setState({ currentTheme: e.currentTarget.value as Theme })}

              onChange={(e) => this.setState({ currentTheme: e.currentTarget.value })}
            >
              {React.Children.toArray(Object.keys(THEMES).map((label) => <option>{label}</option>))}
            </HTMLSelect>
          </label>
          <div className="navbar-separator" />
          <span className="actions-label">Example Actions:</span>
          <button
            className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.GRID_VIEW))}
            onClick={this.autoArrange}
          >
            Auto Arrange
          </button>
          <button
            className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.ARROW_TOP_RIGHT))}
            onClick={this.addToTopRight}
          >
            Add Window to Top Right
          </button>
        </div>
      </div>
    );
  }
}