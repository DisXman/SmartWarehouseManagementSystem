using Microsoft.AspNetCore.Mvc;
using SmartWarehouse.API.DTOs;
using SmartWarehouse.API.Managers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductManager _productManager;

    public ProductController(ProductManager productManager) => _productManager = productManager;

    
    [HttpGet("list")] 
    public async Task<IActionResult> GetList([FromQuery] ProductQueryDto query)
    {
        var result = await _productManager.GetFilteredProductsAsync(query);
        return Ok(result);
    }

     
    [HttpPost("create")] 
    public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
    {
        var success = await _productManager.CreateProductAsync(dto);
        return success ? Ok() : BadRequest();
    }

     
    [HttpPost("update")] 
    public async Task<IActionResult> Update([FromBody] UpdateProductDto dto)
    {
        var success = await _productManager.UpdateProductAsync(dto);
        return success ? Ok() : Forbid(); 
    }

    
    [HttpPost("delete/{id}")] 
    public async Task<IActionResult> Delete([FromBody] DeleteProductDto dto)
    {


        var success = await _productManager.SoftDeleteProductAsync(dto.Id, dto.CompanyId);
        return success ? Ok() : Forbid();
    }
}