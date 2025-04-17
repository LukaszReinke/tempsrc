import { FilterQuery } from '@hd/types';

export const MIN_SEARCH_LENGTH = 3;

export const hasMinimumSearchLength = (value: string): boolean => 
  value.length >= MIN_SEARCH_LENGTH;

export const isEmptySearch = (value: string): boolean => 
  value.length === 0;

export const createFilterQuery = (fieldName: string | null, fieldValue: string): FilterQuery => {
  if (!fieldName || !fieldValue) {
    return { field_name: '', field_value: '' };
  }

  return {
    field_name: fieldName,
    field_value: fieldValue
  };
}; 