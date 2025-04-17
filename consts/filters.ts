export const DEFAULT_FILTER_VALUES = {
  FIELD_NAME: null,
  FIELD_VALUE: '',
  IS_APPROVED: null
} as const;

export type FilterFieldType = string | null;
export type FilterValueType = string;
export type ApprovalFilterType = string | null;

export const INITIAL_FILTER_STATE = {
  fieldName: DEFAULT_FILTER_VALUES.FIELD_NAME as FilterFieldType,
  fieldValue: DEFAULT_FILTER_VALUES.FIELD_VALUE as FilterValueType,
  approval: DEFAULT_FILTER_VALUES.IS_APPROVED as ApprovalFilterType
} as const; 