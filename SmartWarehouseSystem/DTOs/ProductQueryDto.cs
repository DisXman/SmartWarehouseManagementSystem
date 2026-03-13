namespace SmartWarehouse.API.DTOs
{
    // serve-side pagination için 
    public class ProductQueryDto
    {
        public string CompanyId { get; set; } 
        public string? Search { get; set; }    
        public int Page { get; set; } = 1;   
        public int PageSize { get; set; } = 25; 
    }
}