import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  blocks as defaultBlocks,
  addonReducers as defaultAddonReducers,
  addonRoutes as defaultAddonRoutes,
} from '@plone/volto/config';

import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import chartIcon from '@plone/volto/icons/world.svg';
import TopicsView from '~/components/theme/View/TopicsView';
import TopicsTabView from '~/components/theme/View/TopicsTabView';
import FolderListingBlockView from 'volto-addons/FolderListing/BlockView';
import FolderListingBlockEdit from 'volto-addons/FolderListing/BlockEdit';

// import {
//   applyConfig as addonsConfig,
//   installFolderListing,
//   // installCustomAddonGroup,
//   installTableau,
// } from 'volto-addons/config';
// import { applyConfig as ckeditorConfig } from 'volto-ckeditor/config';
// import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
// import { applyConfig as blocksConfig } from 'volto-blocks/config';
// // import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
// import { applyConfig as installSidebar } from 'volto-sidebar/config';

// const config = [
//   // installCustomAddonGroup,
//   addonsConfig,
//   installSidebar,
//   installFolderListing,
//   installTableau,
//   // plotlyConfig,
//   ckeditorConfig,
//   blocksConfig,
//   dataBlocksConfig,
// ].reduce((acc, apply) => apply(acc), voltoConfig);

const env_destinations = (process.env.ALLOWED_CORS_DESTINATIONS || '')
  .split(',')
  .map((s) => s.trim())
  .filter((s) => s.length > 0);
const allowed_cors_destinations = [
  ...(defaultSettings.allowed_cors_destinations || []),
  ...env_destinations,
  'www.eea.europa.eu',
  'eionet.europa.eu',
  'www.eionet.europa.eu',
  'land.copernicus.eu',
];

export const settings = {
  ...defaultSettings,
  contentExpand: [
    'localnavigation',
    'siblings',
    '&expand.localnavigation.depth=2',
  ],
  navDepth: 4,
  allowed_cors_destinations,
};

export const views = {
  ...defaultViews,
  layoutViews: {
    ...defaultViews.layoutViews,
    topics_view: TopicsView,
    topic_tab_view: TopicsTabView,
  },
};

export const widgets = {
  ...defaultWidgets,
  vocabulary: {
    ...defaultWidgets.vocabulary,
    'energy.resource_type': TokenWidget,
    'energy.topics': TokenWidget,
  },
};

export const blocks = {
  ...defaultBlocks,
};

blocks.blocksConfig.folder_contents_block = {
  id: 'folder_contents_block',
  title: 'Folder Contents',
  view: FolderListingBlockView,
  edit: FolderListingBlockEdit,
  icon: chartIcon,
  group: 'custom_addons',
};

export const addonRoutes = [...defaultAddonRoutes];
export const addonReducers = { ...defaultAddonReducers };
