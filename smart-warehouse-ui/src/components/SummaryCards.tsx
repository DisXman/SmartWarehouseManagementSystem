import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { ShoppingCart, Inventory, PointOfSale } from '@mui/icons-material';

interface SummaryProps {
    totalTypes: number;
    totalStock: number;
    totalPrice: number;
}

const SummaryCards: React.FC<SummaryProps> = ({ totalTypes, totalStock, totalPrice }) => {

    // Kart verilerini bir diziye alalım (Daha temiz kod için)
    const cardData = [
        {
            title: 'Ürün Çeşidi',
            // GÜVENLİK: Eğer totalTypes undefined ise 0 yaz
            value: (totalTypes ?? 0).toString(),
            icon: <ShoppingCart sx={{ color: '#1976d2', fontSize: 40 }} />,
            color: '#e3f2fd'
        },
        {
            title: 'Toplam Stok',
            value: (totalStock ?? 0).toLocaleString('tr-TR'),
            icon: <Inventory sx={{ color: '#2e7d32', fontSize: 40 }} />,
            color: '#e8f5e9'
        },
        {
            title: 'Toplam Değer',
            // GÜVENLİK: toLocaleString'i sadece sayı varsa çağırıyoruz
            value: `${(totalPrice ?? 10).toLocaleString('tr-TR')} TL`,
            icon: <PointOfSale sx={{ color: '#ed6c02', fontSize: 40 }} />,
            color: '#fff3e0'
        }
    ];

    return (
        <Grid container spacing={3}>
            {cardData.map((card, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: card.color, borderRadius: 2, boxShadow: 2 }}>
                        <Box sx={{ mr: 2 }}>{card.icon}</Box>
                        <CardContent sx={{ p: '0 !important' }}>
                            <Typography variant="subtitle2" color="textSecondary">
                                {card.title}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                {card.value}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default SummaryCards;