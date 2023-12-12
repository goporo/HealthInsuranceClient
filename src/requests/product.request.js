

// export const getProductDetailRequest = (
//   data: GetProductDetailRequest
// ): ApiResponse<GetProductDetailResponse> => api.get(`/Products/${data.id}`);

import api from "config/axios";

// export const updateProductDetailsRequest = (
//   id: string,
//   data: UpdateDetailRequest
// ): ApiResponse<GetProductDetailResponse> => api.put(`/Products/${id}`, data);

// export const createProductRequest = (
//   data: CreateProductRequest
// ): ApiResponse<GetProductDetailResponse> => api.post('/Products/', data);

export const getProductsRequest = (

) =>
    api.get(`/product/`);

// export const deleteProductDetailsRequest = (
//   id: string
// ): ApiResponse<GetProductDetailResponse> => api.delete(`/Products/${id}`);
// export const getMapImageRequest = (ProductId: string) =>
//   api.get(`/Products/${ProductId}/schematic/map`);
