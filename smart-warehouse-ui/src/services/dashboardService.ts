import axiosInstance from '../api/axiosInstance';

export const dashboardService = {
    getSummary: async (companyId: string) => {
        const response = await axiosInstance.get(`/dashboard/summary/${companyId}`);
        return response.data; // Backend'den gelen { success: true, data: {...} } yapısı
    }
};