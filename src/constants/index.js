const PAGINATION = {
  TABLE_MANAGE: 5,
};

const CAMPAIGN_VISIBILITY = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

const CAMPAIGN_STATUS = {
  DRAFT: 'DRAFT',
  WAITING: 'WAITING',
  RUNNING: 'RUNNING',
  PAUSE: 'PAUSE',
  END: 'END',
};

const CAMPAIGN_TYPE = {
  CHATBOT_INTENT: 'CHATBOT_INTENT',
  CHATBOT_USECASE: 'CHATBOT_USECASE',
  FAQ: 'FAQ',
  SLU: 'SLU',
  ASR: 'ASR',
};

const SYSTEM_ROLE = {
  ADMIN: 'ADMIN',
  SERVICE_MANAGER: 'SERVICE_MANAGER',
  USER: 'USER',
};

const CAMPAIGN_ROLE = {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  CONTRIBUTOR: 'CONTRIBUTOR',
  REVIEWER: 'REVIEWER',
  VIEWER: 'VIEWER',
};

const MAX_ITEMS_SMALL = 5;
const DEFAULT_TARGET = '200';

export {
  PAGINATION,
  CAMPAIGN_VISIBILITY,
  CAMPAIGN_STATUS,
  CAMPAIGN_TYPE,
  MAX_ITEMS_SMALL,
  SYSTEM_ROLE,
  CAMPAIGN_ROLE,
  DEFAULT_TARGET,
};
