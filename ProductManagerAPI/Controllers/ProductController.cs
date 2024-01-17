using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;
using Microsoft.AspNetCore.Authorization;

namespace ProductManagerAPI.Controllers;

[Authorize]
[ApiController]
[Route("product")]
public class ProductController : ControllerBase
{
    private readonly ProductManagerContext _productMngContext;
    public ProductController(ProductManagerContext productMngContext) => _productMngContext = productMngContext;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var products = await _productMngContext.Product.ToListAsync();
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
        try
        {
            _productMngContext.Product.Add(model);
            await _productMngContext.SaveChangesAsync();
            return Ok(model);
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var product = await _productMngContext.Product.FindAsync(id);
            return Ok(product);
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpPut]
    [Route("")]
    public async Task<IActionResult> Edit(Product model)
    {
        try
        {
            _productMngContext.Product.Update(model);
            await _productMngContext.SaveChangesAsync();
            return Ok(model);
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
            var findProductForDelete = await _productMngContext.Product.FindAsync(id);
            if (findProductForDelete == null)
            {
                return NotFound();
            }

            _productMngContext.Product.Remove(findProductForDelete);
            _productMngContext.SaveChanges();
            return Ok();
        }
        catch (Exception e)
        {
            throw;
        }
    }
}