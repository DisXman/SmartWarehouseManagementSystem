using SmartWarehouse.API.Entities;
using SmartWarehouseSystem.API.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartWarehouseSystem.API.Entities
{
    public class Product : BaseEntity
    {

        [Required]
        public string Name { get; set; } 

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; } 

        public string CategoryName { get; set; } 

        [Required]
        public int WarehouseId { get; set; }
        [ForeignKey("WarehouseId")]
        public virtual Warehouse Warehouse { get; set; }



        [ForeignKey("CompanyId")]
        public Company Company { get; set; }
        [Required]
        public string CompanyId { get; set; }
    }
}