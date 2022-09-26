export const ACTIONS = {
  LIST: 'list',
  FILTERS: 'filters',
  CONTINUE: 'continue',
  ACTION: 'action',
  LIKE: 'like',
  DISLIKE: 'dislike',
  PREVIEW: 'preview',
  PREV_PAGE: 'prevPage',
  NEXT_PAGE: 'nextPage',
  WATCH: 'watch',
  UNWATCH: 'unwatch',
  DELETE: 'delete',
};

export const COMMANDS = {
  START: {
    command: 'start',
    description: 'Start me',
  },
  LIST: {
    command: 'list',
    description: 'Show my anime list',
  },
  FILTERS: {
    command: 'filters',
    description: 'Change search filters',
  },
};

export const LIST_PAGE_MAX_ITEMS = 5;

export const MAX_DESCRIPTION_LENGTH = 512;
