using SmartWarehouse.API.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartWarehouseSystem.API.Entities
{
    public class Warehouse : BaseEntity
    {

        [Required]
        public string Name { get; set; }
        public string Corridor { get; set; }
        public string Location { get; set; }

        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; }

        public virtual ICollection<Product> Products { get; set; }

    }
}
