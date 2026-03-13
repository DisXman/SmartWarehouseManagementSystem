import axiosInstance from './axiosInstance';

export const warehouseService = {
    // Şirkete ait tüm depo ve koridorları getirir
    getAll: async (companyId: string) => {
        const response = await axiosInstance.get(`/warehouse/all/${companyId}`);
        return response.data;
    }
};