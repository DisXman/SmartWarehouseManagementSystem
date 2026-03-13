namespace SmartWarehouse.API.DTOs
{
    // delete methodu yasak oldugu için silinecek id'yi ve güvenlik için companyid'yi post methodu ile göndermeliyiz.
    public class DeleteProductDto
    {
        public int Id { get; set; }           

        public string CompanyId { get; set; } 
    }
}