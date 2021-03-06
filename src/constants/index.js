const PAGINATION = {
  TABLE_MANAGE: 5,
  TABLE_REVIEW: 10,
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
  ASR_COLLECTION: 'ASR_COLLECTION',
  ASR_VALIDATION: 'ASR_VALIDATION',
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

const PARTICIPATION_STATUS = {
  JOINED: 'JOINED',
  INVITED: 'INVITED',
};

const REVIEW_RESULT_STATUS = {
  NOT_REVIEW: 'NOT_REVIEW',
  PASS: 'PASS',
  REJECT: 'REJECT',
};

const FAQ_CATEGORY_STATUS = {
  INPUT_STATUS_NEW: 'new',
  INPUT_STATUS_DRAFT: 'draft',
};

export {
  PAGINATION,
  CAMPAIGN_VISIBILITY,
  CAMPAIGN_STATUS,
  CAMPAIGN_TYPE,
  MAX_ITEMS_SMALL,
  SYSTEM_ROLE,
  CAMPAIGN_ROLE,
  DEFAULT_TARGET,
  PARTICIPATION_STATUS,
  REVIEW_RESULT_STATUS,
  FAQ_CATEGORY_STATUS,
};
