export interface IProductModel {
  name: string;
  code: string;
  weight?: number;
  description?: string;
}

export interface IProductResponse {
  name: string;
  code: string;
  weight?: number;
  description?: string;
  ImageUrl?: string;
}
