// Backend'deki ProductResponseDto karşılığı
export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    categoryName: string;
    warehouseName: string;
    corridor: string;
    companyId: number;
}

// Backend'deki ProductQueryDto karşılığı
export interface ProductQuery {
    companyId: number;
    search?: string;
    page: number;
    pageSize: number;
}

// Backend'den dönen sayfalama yapısı
export interface PaginatedResult<T> {
    success: boolean;
    data: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}