import routes from './route';

export default [
  {
    heading: 'home',
    icon: 'home',
    route: routes.HOME,
  },
  {
    heading: 'serviceManageMenu',
    icon: 'account_tree',
    route: routes.SERVICE_MANAGE,
  },
  {
    heading: 'campaignManageMenu',
    icon: 'widgets',
    route: routes.CAMPAIGN_MANAGE,
  },
  {
    heading: 'audioASRManage',
    icon: 'queue_music',
    route: routes.AUDIO_MANAGE,
  },
];
