export type ApiMeta = {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
};

export type ApiData<T> = {
    status: string;
    items: T[];
};

export type ApiResponse<T> = {
    meta: ApiMeta;
    data: ApiData<T>;
};