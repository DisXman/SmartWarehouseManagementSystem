using System.ComponentModel.DataAnnotations;

namespace SmartWarehouse.API.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CompanyId { get; set; } 

        public bool IsDeleted { get; set; } = false; 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 

        public DateTime? UpdatedAt { get; set; } 
    }
}