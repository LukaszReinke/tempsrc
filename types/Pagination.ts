export interface PaginationMeta {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  }
  
  export interface PaginatedResponse<T> {
    meta: PaginationMeta;
    data: {
      status: string;
      items: T[];
    };
  }