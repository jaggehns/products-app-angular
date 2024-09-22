export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  description: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  number: number;
  size: number;
}
