import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { productService } from '../services/productService';

interface ProductModalProps {
    open: boolean;
    handleClose: () => void;
    refreshData: () => void; // Ekleme sonrası tabloyu yenilemek için
    companyId: string;
}

const modalStyle = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 450, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
};

const ProductModal: React.FC<ProductModalProps> = ({ open, handleClose, refreshData, companyId }) => {
    const [formData, setFormData] = useState({
        name: '', price: '', quantity: '', categoryName: '', warehouseId: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const payload = {
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            warehouseId: Number(formData.warehouseId),
            companyId: companyId, // Dashboard'dan gelen aktif ID
            isDeleted: false
        };

        const result = await productService.createProduct(payload) as any;
        if (result.success) {
            refreshData(); // Tabloyu yenile
            handleClose(); // Modalı kapat
            setFormData({ name: '', price: '', quantity: '', categoryName: '', warehouseId: '' }); // Formu temizle
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" sx={{ mb: 3 }}>Yeni Ürün Ekle</Typography>
                <Grid container spacing={2}>
                    <Grid size={{xs:12}}>
                        <TextField fullWidth label="Ürün Adı" name="name" onChange={handleChange} />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField fullWidth label="Fiyat" name="price" type="number" onChange={handleChange} />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField fullWidth label="Miktar" name="quantity" type="number" onChange={handleChange} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Kategori" name="categoryName" onChange={handleChange} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Depo ID" name="warehouseId"  onChange={handleChange} />
                    </Grid>
                    <Grid size={{ xs: 12 }} >
                        <Button variant="contained" fullWidth onClick={handleSubmit} size="large">
                            Ürünü Kaydet
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default ProductModal;