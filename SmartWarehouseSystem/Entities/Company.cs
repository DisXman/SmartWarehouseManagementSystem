using SmartWarehouse.API.Entities;
using System.ComponentModel.DataAnnotations;

namespace SmartWarehouseSystem.API.Entities
{
    public class Company : BaseEntity
    {

        [Required]
        public string Name { get; set; }
        
        [Required]
        public string CompanyKey { get; set; }
        public ICollection<Product> Products { get; set; }

        public ICollection<Warehouse> Warehouses { get; set; }

    }
}
