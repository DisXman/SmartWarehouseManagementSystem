import axiosInstance from '../api/axiosInstance';
import { PaginatedResult, Product } from '../types/product.types';
import axios from 'axios'; 
const API_URL = 'https://localhost:7121/api/Product'; 

export const productService = {
    getProducts: async (companyId: string, page: number, pageSize: number, search?: string) => {
        const response = await axiosInstance.get<PaginatedResult<Product>>('/product/list', {
            params: {
                companyId,
                page,
                pageSize,
                search
            }
        });
        return response.data;
    },


    createProduct: async (productData: any) => {
        const response = await axios.post(`${API_URL}/create`, productData);
        return response.data;
    },


    updateProduct: async (productData: any) => {
        const response = await axiosInstance.post('/product/update', productData);
        return response.data;
    },

   
    deleteProduct: async (id: number, companyId: string) => {
        const dto = {
            id: id,
            companyId: companyId
        };

        
        const response = await axios.post(`${API_URL}/delete/${id}`, dto);
        return response;
    }
};