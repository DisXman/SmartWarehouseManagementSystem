namespace SmartWarehouse.API.DTOs
{
    public class DashboardSummaryDto
    {
        public int TotalProductTypes { get; set; }    // kaç farklı ürün var
        public int TotalStockQuantity { get; set; }   // toplam kaç adet ürün var
        public decimal TotalPriceSum { get; set; }    // depodaki malların toplam tl değeri
    }
}