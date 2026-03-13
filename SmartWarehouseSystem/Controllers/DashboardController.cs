using Microsoft.AspNetCore.Mvc;
using SmartWarehouse.API.Managers;

namespace SmartWarehouse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardManager _dashboardManager;

        public DashboardController(DashboardManager dashboardManager)
        {
            _dashboardManager = dashboardManager;
        }

        // Frontend'den gelen isteği karşılayan metod
        [HttpGet("summary/{companyId}")]
        public async Task<IActionResult> GetSummary(string companyId)
        {
            // Manager'daki metodunu çağırıyoruz
            var result = await _dashboardManager.GetCompanySummaryAsync(companyId);

            // Dökümanda istenen success/data formatında dönüyoruz
            return Ok(new { success = true, data = result });
        }
    }
}