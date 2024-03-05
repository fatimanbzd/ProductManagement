using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using ProductManagerAPI.Repositories.IServices;

namespace ProductManagerAPI.Controllers;

[Authorize]
[ApiController]
[Route("product")]
public class ProductController : ControllerBase
{
    private readonly ProductManagerContext _productMngContext;
    private readonly IProductService _productService;

    public ProductController(ProductManagerContext productMngContext, IProductService productService)
    {
        _productMngContext = productMngContext;
        _productService = productService;
    }

    [HttpGet]
    [Route("")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> Add(Product model)
    {
        if (model == null)
        {
            return BadRequest();
        }
        await _productService.AddProduct(model);

        return Ok(new ApiResponse<int>()
        {
            Result = model.Id,
            IsSuccess = true,
        });
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var product = await _productService.GetProductById(id);
            return NoContent();
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpPut]
    [Route("")]
    public async Task<IActionResult> Uodate(Product model)
    {
        try
        {
            await _productService.UpdateProduct(model);
            return NoContent();
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var findProductForDelete = await _productService.GetProductById(id);
            if (findProductForDelete == null)
            {
                return NotFound();
            }

            await _productService.DeleteProduct(id);
            _productMngContext.SaveChanges();
            return NoContent();
        }
        catch (Exception e)
        {
            throw;
        }
    }
}