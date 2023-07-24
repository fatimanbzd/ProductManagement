using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Controllers;

[ApiController]
[Route("customerOrder")]
public class CustomerOrderController : ControllerBase
{
    private readonly ProductManagerContext _productMngContext;
    public CustomerOrderController(ProductManagerContext productMngContext) => _productMngContext = productMngContext;


    [HttpPost]
    [Route("add")]
    public async Task<IActionResult> Add(CustomerOrder model)
    {
        try
        {
            model.OrderNo = GenerateOrderNo("orf-");
            _productMngContext.CustomerOrder.Add(model);
            await _productMngContext.SaveChangesAsync();
            return Ok(model);
        }
        catch (Exception e)
        {
            throw;
        }
    }

    private string GenerateOrderNo(string prefix)
    {
        Random generator = new Random();
        String r = generator.Next(0, 1000000000).ToString("D6");
        string OrderNumber = String.Format("{0}-{1}{2}-{3}", prefix, DateTime.Now.Year, DateTime.Now.Month.ToString("D2"), r);
        return OrderNumber;
    }

}