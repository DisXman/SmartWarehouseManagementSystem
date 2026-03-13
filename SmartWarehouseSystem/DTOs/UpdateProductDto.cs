namespace SmartWarehouse.API.DTOs
{
    //güncelleme yaparken id bilmek zorundayız.
    public class UpdateProductDto
    {
        public int Id { get; set; }        
        public string CompanyId { get; set; } 
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string CategoryName { get; set; }
        public int WarehouseId { get; set; }
    }
}