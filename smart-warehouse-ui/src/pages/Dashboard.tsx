import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button, Divider } from '@mui/material';
import SummaryCards from '../components/SummaryCards';
import { dashboardService } from '../services/dashboardService';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';

const Dashboard: React.FC = () => {
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // Sabit CompanyId (Artık kullanıcıdan almıyoruz)
    const companyId = "TECH-HUB-002";

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await dashboardService.getSummary(companyId) as any;

            if (response.success) {
                // Çift 'data' sarmalını çözüyoruz
                const actualData = response.data.data || response.data;
                setSummary({
                    totalProductTypes: actualData.totalProductTypes,
                    totalStockQuantity: actualData.totalStockQuantity,
                    totalPriceSum: actualData.totalPriceSum
                });
            }
        } catch (error) {
            console.error("Veri çekme hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    // Sayfa açıldığında otomatik getir
    useEffect(() => {
        fetchData();
    }, []);

    // Ürün eklendiğinde tabloyu ve kartları yenile
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
        fetchData();
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Üst Başlık ve Ekle Butonu */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Smart Warehouse Dashboard
                </Typography>
                <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                    Yeni Ürün Ekle
                </Button>
            </Box>

            {/* Özet Kartları */}
            {summary && (
                <SummaryCards
                    totalTypes={summary.totalProductTypes}
                    totalStock={summary.totalStockQuantity}
                    totalPrice={summary.totalPriceSum}
                />
            )}

            {/* Ürün Listesi Tablosu */}
            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Ürün Listesi</Typography>
                <Divider sx={{ mb: 3 }} />

                {/* ProductTable artık sadece refreshKey ile tetikleniyor */}
                <ProductTable refreshKey={refreshKey} />
            </Box>

            {/* Ürün Ekleme Modalı */}
            <ProductModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                refreshData={handleRefresh}
                companyId={companyId}
            />
        </Container>
    );
};

export default Dashboard;