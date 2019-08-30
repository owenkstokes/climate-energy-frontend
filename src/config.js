/**
 * Add your config changes here.
 * @module config
 * @example
 * export const settings = {
 *   ...defaultSettings,
 *   port: 4300,
 *   listBlockTypes: {
 *     ...defaultSettings.listBlockTypes,
 *     'my-list-item',
 *   }
 * }
 */

import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  tiles as defaultTiles,
} from '@plone/volto/config';

// Tiles
import TwoColumnsTileEdit from '~/components/manage/Tiles/TwoColumnsTile/Edit';
import TwoColumnsTileView from '~/components/manage/Tiles/TwoColumnsTile/View';

import ImageAndRichTextTileEdit from '~/components/manage/Tiles/ImageAndRichTextTile/Edit';
import ImageAndRichTextTileView from '~/components/manage/Tiles/ImageAndRichTextTile/View';

// Display types
import CountryView from '~/components/CountryView/CountryView';
import CountryPageView from '~/components/CountryPageView/CountryPageView';
import HomepageView from '~/components/HomepageView/HomepageView';

import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import divideVertical from '@plone/volto/icons/divide-vertical.svg';

const Underline = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});

export const settings = {
  ...defaultSettings,
  richTextEditorInlineToolbarButtons: [
    Underline,
    ...defaultSettings.richTextEditorInlineToolbarButtons,
  ],
};

console.log(settings)

export const views = {
  ...defaultViews,
  layoutViews: {
    ...defaultViews.layoutViews,
    full_view: CountryView,
    country_tab_view: CountryPageView,
    homepage_view: HomepageView,
  }
};

export const widgets = {
  ...defaultWidgets,
};

export const tiles = {
  ...defaultTiles,
  customTiles: [
    ...defaultTiles.customTiles,
    {
      title: 'imageandrichtext',
      icon: divideVertical
    }
  ],
  defaultTilesViewMap: {
    ...defaultTiles.defaultTilesViewMap,
    imageandrichtext: ImageAndRichTextTileView
  },
  defaultTilesEditMap: {
    ...defaultTiles.defaultTilesEditMap,
    imageandrichtext: ImageAndRichTextTileEdit
  },
  // messagesTiles: defaultTiles.messagesTiles,
  // requiredTiles: defaultTiles.requiredTiles,
  // sidebarComponents: {
  //   ...defaultTiles.sidebarComponents
  // }
};
