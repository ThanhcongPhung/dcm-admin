import routes from './route';

export default [
  {
    heading: 'overview',
    icon: 'home',
    route: routes.OVERVIEW,
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
  {
    heading: 'scenarioASRManage',
    icon: 'subject',
    route: routes.ASR_SCENARIO_MANAGE,
  },
  {
    heading: 'faqManage',
    icon: 'question_answer',
    subMenus: [
      {
        heading: 'intentCategory',
        icon: 'table_view',
        route: routes.FAQ_INTENT_CATEGORIES,
      },
      {
        heading: 'intentManage',
        icon: 'article',
        route: routes.FAQ_INTENT_MANAGE,
      },
    ],
  },
  {
    heading: 'nluManageMenu',
    icon: 'library_books',
    subMenus: [
      {
        heading: 'intentManageMenu',
        icon: 'assignment',
        route: routes.NLU_MANAGE_INTENTS,
      },
    ],
  },
];
