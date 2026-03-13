using Microsoft.EntityFrameworkCore;
using SmartWarehouse.API.DTOs;
using SmartWarehouse.API.Entities;
using SmartWarehouseSystem.API.Entities;

namespace SmartWarehouse.API.Managers
{
    public class ProductManager
    {
        private readonly AppDbContext _context;

        public ProductManager(AppDbContext context)
        {
            _context = context;
        }


        // listeleme side pagination
        public async Task<object> GetFilteredProductsAsync(ProductQueryDto query)
        {
            var baseQuery = _context.Products
                .Include(p => p.Warehouse)  
                .Where(x => x.CompanyId == query.CompanyId && !x.IsDeleted);

            
            if (!string.IsNullOrEmpty(query.Search))
            {
                baseQuery = baseQuery.Where(x => x.Name.Contains(query.Search) || x.CategoryName.Contains(query.Search));
            }

            var totalCount = await baseQuery.CountAsync(); 

            var data = await baseQuery
                .OrderByDescending(x => x.CreatedAt) 
                .Skip((query.Page - 1) * query.PageSize) 
                .Take(query.PageSize)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    CategoryName = p.CategoryName,
                    WarehouseName = p.Warehouse.Name,
                    Corridor = p.Warehouse.Corridor,
                    CompanyId = p.CompanyId
                })
                .ToListAsync();

            return new
            {
                Success = true,
                Data = data,
                TotalCount = totalCount,
                Page = query.Page,
                PageSize = query.PageSize,
                TotalPages = (int)Math.Ceiling((double)totalCount / query.PageSize)
            };
        }

        public async Task<bool> CreateProductAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                Quantity = dto.Quantity,
                CategoryName = dto.CategoryName,
                WarehouseId = dto.WarehouseId,
                CompanyId = dto.CompanyId 
            };

            await _context.Products.AddAsync(product);
            return await _context.SaveChangesAsync() > 0;
        }

     
        public async Task<bool> UpdateProductAsync(UpdateProductDto dto)
        {
            var existing = await _context.Products.FindAsync(dto.Id);

        
            if (existing == null || existing.CompanyId != dto.CompanyId || existing.IsDeleted)
                return false;

            existing.Name = dto.Name;
            existing.Price = dto.Price;
            existing.Quantity = dto.Quantity;
            existing.CategoryName = dto.CategoryName;
            existing.WarehouseId = dto.WarehouseId;
            existing.UpdatedAt = DateTime.UtcNow; 

            
            _context.Entry(existing).State = EntityState.Modified;

            return await _context.SaveChangesAsync() > 0;
        }

        
        public async Task<bool> SoftDeleteProductAsync(int id, string companyId)
        {
            var existing = await _context.Products.FindAsync(id);

           
            if (existing == null || existing.CompanyId != companyId)
                return false;

            existing.IsDeleted = true; // 
            _context.Entry(existing).State = EntityState.Modified;

            return await _context.SaveChangesAsync() > 0;
        }
    }
}