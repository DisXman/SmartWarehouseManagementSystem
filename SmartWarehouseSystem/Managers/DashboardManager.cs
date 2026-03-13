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
            // Veritabanına tek bir filtre ile gidiyoruz
            var query = _context.Products
                .Where(p => p.CompanyId == companyId && !p.IsDeleted);

            // Tüm hesaplamaları tek bir hamlede yapıyoruz
            var summaryData = await query
                .GroupBy(x => 1) // Tek bir grup oluşturup tüm veriyi toplamak için
                .Select(g => new
                {
                    TotalProductTypes = g.Count(),
                    TotalStockQuantity = g.Sum(p => p.Quantity),
                    // Birim fiyat * Adet = Toplam Depo Değeri
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