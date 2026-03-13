using Microsoft.EntityFrameworkCore;
using SmartWarehouse.API.Entities;
using SmartWarehouseSystem.API.Entities;

namespace SmartWarehouse.API.Entities
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

           
            modelBuilder.Entity<Company>().HasQueryFilter(c => !c.IsDeleted);
            modelBuilder.Entity<Warehouse>().HasQueryFilter(w => !w.IsDeleted);
            modelBuilder.Entity<Product>().HasQueryFilter(p => !p.IsDeleted);

            
            modelBuilder.Entity<Product>()
                        .HasOne(p => p.Warehouse)
                        .WithMany(w => w.Products)
                        .HasForeignKey(p => p.WarehouseId)
                        .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Product>()
                        .HasOne(p => p.Company)
                        .WithMany(c => c.Products)
                        .HasForeignKey(p => p.CompanyId)
                        .OnDelete(DeleteBehavior.NoAction)
                        .HasPrincipalKey(c => c.CompanyId); 

            
            modelBuilder.Entity<Product>()
                        .Property(p => p.Price)
                        .HasPrecision(18, 2);

            modelBuilder.Entity<Warehouse>()
                        .HasOne(w => w.Company)
                        .WithMany(c => c.Warehouses)
                        .HasForeignKey(w => w.CompanyId)
                        .HasPrincipalKey(c => c.CompanyId);


        }
    }
}