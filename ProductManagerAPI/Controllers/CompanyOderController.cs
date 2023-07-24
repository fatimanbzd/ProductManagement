using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Controllers;

[ApiController]
[Route("companyOrder")]
public class CompanyOrderController : ControllerBase
{
    private readonly ProductManagerContext _productMngContext;
    public CompanyOrderController(ProductManagerContext productMngContext) => _productMngContext = productMngContext;


    [HttpPost]
    [Route("add")]
    public async Task<IActionResult> Add(CompanyOrder model)
    {
        try
        {
            _productMngContext.CompanyOrder.Add(model);
            await _productMngContext.SaveChangesAsync();
            return Ok(model);
        }
        catch (Exception e)
        {
            throw;
        }
    }


}