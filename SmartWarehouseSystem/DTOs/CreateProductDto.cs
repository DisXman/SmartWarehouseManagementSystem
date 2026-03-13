namespace SmartWarehouse.API.DTOs
{

    // yeni ürün eklerken id gönderilmez. id içermeyen temiz bir paket lazım.
    public class CreateProductDto
    {
        public string CompanyId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string CategoryName { get; set; }
        public int WarehouseId { get; set; }
    }
}