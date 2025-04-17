'use client';

import { useState, useCallback } from 'react';
import { Select, Input } from '@hd/ui';
import { SelectOption } from '@hd/ui';
import { createFilterQuery, hasMinimumSearchLength } from '@hd/utils';
import { FilterQuery, FieldDisplayNames, FilterFields } from '@hd/types';

interface TableFilterProps<T extends string> {
  filterFields: FilterFields;
  onFilterChange: (query: FilterQuery) => void;
  placeholder?: string;
}

const FIELD_DISPLAY_NAMES: FieldDisplayNames = {
  CONTEST_NAME: 'Contest Name',
  CATEGORIES: 'Categories',
  FEDERATION: 'Federation',
  WORKSHOP_TOPIC: 'Workshop Topic',
  ORGANIZER: 'Organizer',
  COACHES: 'Coaches'
};

export const TableFilter = <T extends string>({ 
  filterFields, 
  onFilterChange,
  placeholder = 'Search...'
}: TableFilterProps<T>) => {
  const [selectedField, setSelectedField] = useState<T | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const updateFilters = useCallback((field: T | null, value: string) => {
    if (!field || !hasMinimumSearchLength(value)) {
      const query = createFilterQuery(null, '');
      onFilterChange(query);
      return;
    }
    const query = createFilterQuery(field, value);
    onFilterChange(query);
  }, [onFilterChange]);

  const handleFieldChange = useCallback((option: SelectOption) => {
    const value = option.value as T;
    setSelectedField(value);
    updateFilters(value, searchValue);
  }, [searchValue, updateFilters]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    updateFilters(selectedField, newValue);
  }, [selectedField, updateFilters]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="w-full sm:w-48">
        <Select
          onChange={handleFieldChange}
          options={Object.entries(filterFields).map(([key, value]) => ({
            label: FIELD_DISPLAY_NAMES[key] || key,
            value
          }))}
          placeholder="Select field"
        />
      </div>
      <div className="flex-1">
        <Input
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="w-full"
        />
      </div>
    </div>
  );
}; 