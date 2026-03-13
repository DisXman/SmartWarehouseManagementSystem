using System.ComponentModel.DataAnnotations;

namespace SmartWarehouse.API.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; } // [cite: 18]

        [Required]
        public string CompanyId { get; set; } // Zorunlu Multi-tenant alan [cite: 33, 68]

        public bool IsDeleted { get; set; } = false; // Zorunlu Soft Delete alan [cite: 34]

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // [cite: 95]

        public DateTime? UpdatedAt { get; set; } // 
    }
}