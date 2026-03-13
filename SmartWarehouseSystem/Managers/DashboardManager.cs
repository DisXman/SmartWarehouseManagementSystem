using Microsoft.EntityFrameworkCore;
using SmartWarehouse.API.Entities;

namespace SmartWarehouse.API.Managers
{
    public class DashboardManager
    {
        private readonly AppDbContext _context;

        public DashboardManager(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> GetCompanySummaryAsync(string companyId)
        {
            var query = _context.Products
                .Where(p => p.CompanyId == companyId && !p.IsDeleted);

            
            var summaryData = await query
                .GroupBy(x => 1)
                .Select(g => new
                {
                    TotalProductTypes = g.Count(),
                    TotalStockQuantity = g.Sum(p => p.Quantity),
                    TotalPriceSum = g.Sum(p => p.Price * p.Quantity)
                })
                .FirstOrDefaultAsync();

            return new
            {
                Success = true,
                Data = summaryData ?? new { TotalProductTypes = 0, TotalStockQuantity = 0, TotalPriceSum = 0m }
            };
        }
    }
}