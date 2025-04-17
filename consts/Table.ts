export const DEFAULT_TABLE_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 1;

export const CONTEST_FILTER_FIELDS = {
  CONTEST_NAME: 'contest_name',
  CATEGORIES: 'categories',
  FEDERATION: 'federation',
} as const;

export const WORKSHOP_FILTER_FIELDS = {
  WORKSHOP_TOPIC: 'workshop_topic',
  ORGANIZER: 'organizer',
  COACHES: 'coaches',
} as const;

export type ContestFilterField = typeof CONTEST_FILTER_FIELDS[keyof typeof CONTEST_FILTER_FIELDS];
export type WorkshopFilterField = typeof WORKSHOP_FILTER_FIELDS[keyof typeof WORKSHOP_FILTER_FIELDS]; 