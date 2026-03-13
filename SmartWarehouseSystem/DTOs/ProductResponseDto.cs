namespace SmartWarehouse.API.DTOs
{

    //kullanıcı önüne giden paket
    public class ProductResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string CategoryName { get; set; }
        public string WarehouseName { get; set; } 
        public string Corridor { get; set; }      
        public string CompanyId { get; set; }
    }
}