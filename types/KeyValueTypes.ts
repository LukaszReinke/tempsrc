export type KeyValue<K extends string, V> = {
  [key in K]: V;
};

export type SelectOption = KeyValue<'label' | 'value', string>;

export type FilterQuery = KeyValue<'field_name' | 'field_value', string>;

export type FieldDisplayNames = KeyValue<string, string>;

export type FilterFields = KeyValue<string, string>;

export type FormFields = KeyValue<string, string | null>;

export type PaginatedResponse<T> = {
  data: {
    items: T[];
  };
  meta: {
    total_pages: number;
    total_items: number;
  };
}; 