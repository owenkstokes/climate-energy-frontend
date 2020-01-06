import * as voltoConfig from '@plone/volto/config';

import {
  applyConfig as addonsConfig,
  installFolderListing,
  installCustomAddonGroup,
  installTableau,
} from 'volto-addons/config';
import { applyConfig as ckeditorConfig } from 'volto-ckeditor/config';
import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
import { applyConfig as blocksConfig } from 'volto-blocks/config';
import { applyConfig as mosaicConfig } from 'volto-mosaic/config';
import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
import { applyConfig as installEnergyFrontend } from './localconfig';

const config = [
  installCustomAddonGroup,
  addonsConfig,
  installFolderListing,
  installTableau,
  plotlyConfig,
  ckeditorConfig,
  mosaicConfig,
  blocksConfig,
  dataBlocksConfig,
  installEnergyFrontend,
].reduce((acc, apply) => apply(acc), voltoConfig);

// config.settings.contentExpand=[breadcrumbs,actions,workflow]


export const settings = {
  ...config.settings,
  contentExpand: [...config.settings.contentExpand.filter(content => content !== 'navigation'), ...['siblings', 'navigation', '&expand.navigation.depth=4']]
};

export const views = {
  ...config.views,
};

export const widgets = {
  ...config.widgets,
};

export const blocks = {
  ...config.blocks,
};

export const addonReducers = { ...config.addonReducers };
export const addonRoutes = [...(config.addonRoutes || [])];
export const viewlets = [...(config.viewlets || [])];

export const portlets = {
  ...config.portlets,
};

// console.log('config', config);
