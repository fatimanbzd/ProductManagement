using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Controllers;

[ApiController]
[Route("customer")]
public class CustomerController : ControllerBase
{
    private readonly ProductManagerContext _productMngContext;
    public CustomerController(ProductManagerContext productMngContext) => _productMngContext = productMngContext;

    [HttpGet]
    [Route("get")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var products = await _productMngContext.Customer.ToListAsync();
            return Ok(products);
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpPost]
    [Route("add")]
    public async Task<IActionResult> Add(Customer model)
    {
        try
        {
            _productMngContext.Customer.Add(model);
            await _productMngContext.SaveChangesAsync();
            return Ok(model);
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpGet]
    [Route("get/{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var customer = await _productMngContext.Customer.FindAsync(id);
            return Ok(customer);
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpPut]
    [Route("update")]
    public async Task<IActionResult> Edit(Customer model)
    {
        try
        {
            _productMngContext.Customer.Update(model);
            await _productMngContext.SaveChangesAsync();
            return Ok(model);
        }
        catch (Exception e)
        {
            throw;
        }
    }

    [HttpDelete]
    [Route("remove/{id}")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var findCustomerForDelete = await _productMngContext.Customer.FindAsync(id);
            if (findCustomerForDelete == null)
            {
                return NotFound();
            }

            _productMngContext.Customer.Remove(findCustomerForDelete);
            _productMngContext.SaveChanges();
            return Ok();
        }
        catch (Exception e)
        {
            throw;
        }
    }
}