import React, { useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { TextField, Box, Paper } from '@mui/material';
import { productService } from '../services/productService';
import { Product } from '../types/product.types';

import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

// Dashboard'dan gelebilecek propları tanımlıyoruz
interface ProductTableProps {
    // Dashboard'daki modal kapandığında tabloyu yenilemek için kullanacağız
    refreshKey?: number;
}

// React.FC<ProductTableProps> ekleyerek "products" veya diğer propları tanınır hale getiriyoruz
const ProductTable: React.FC<ProductTableProps> = ({ refreshKey }) => {
    const [rows, setRows] = useState<Product[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const companyId = "TECH-HUB-002";


    const handleDelete = async (id: number) => {
        if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
            try {
                // Servis hem ID hem de CompanyId bekliyor!
                // Yukarıda tanımladığın "TECH-HUB-002" değişkenini gönderiyoruz.
                const result = await productService.deleteProduct(id, companyId) as any;

                // Backend sadece Ok() döndüğü için result.status kontrolü daha sağlıklı olabilir
                // veya servisin response.data döndürüyorsa onu kontrol etmelisin.
                if (result.status === 200 || result.success) {
                    alert("Ürün başarıyla silindi.");
                    loadProducts(); // Tabloyu yenile
                }
            } catch (error: any) {
                console.error("Silme hatası detayı:", error.response);
                alert("Silme işlemi başarısız. Yetki hatası veya sunucu sorunu.");
            }
        }
    };

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            const result = await productService.getProducts(
                companyId,
                paginationModel.page + 1,
                paginationModel.pageSize,
                search
            ) as any; // Tip hatasını önlemek için as any

            if (result.success) {
                // Backend'den PaginatedResult dönüyorsa result.data.items'a bakmalısın
                setRows(result.data.items || result.data || []);
                setTotalCount(result.data.totalCount || result.totalCount || 0);
            }
        } catch (error) {
            console.error("Ürünler yüklenirken hata:", error);
        } finally {
            setLoading(false);
        }
    }, [paginationModel, search, companyId]);

    // Sayfa, arama VEYA refreshKey değiştiğinde veriyi çek
    useEffect(() => {
        loadProducts();
    }, [loadProducts, refreshKey]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Ürün Adı', flex: 1 },
        { field: 'categoryName', headerName: 'Kategori', width: 150 },
        {
            field: 'price',
            headerName: 'Fiyat',
            width: 120,
            renderCell: (params) => {
                const value = params.value;
                return value != null
                    ? `${value.toLocaleString('tr-TR')} TL`
                    : '0 TL';
            }
        },
        { field: 'quantity', headerName: 'Miktar', width: 100 },
        { field: 'warehouseName', headerName: 'Depo', width: 150 },
        { field: 'corridor', headerName: 'Koridor', width: 100 },
        {
            field: 'actions',
            headerName: 'İşlemler',
            width: 100,
            sortable: false, // Silme butonuna göre sıralama yapılmasın
            renderCell: (params) => (
                <IconButton
                    color="error"
                    onClick={() => handleDelete(params.row.id)} // Satırdaki ID'yi gönderir
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    label="Ürün veya Kategori Ara..."
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalCount}
                    loading={loading}
                    pageSizeOptions={[5, 10, 25]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    paginationMode="server"
                    getRowId={(row) => row.id || row.Id}
                    disableRowSelectionOnClick
                />
            </div>
        </Paper>
    );
};

export default ProductTable;