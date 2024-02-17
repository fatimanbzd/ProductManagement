

using Microsoft.AspNetCore.Mvc;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Controllers;

[Route("user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ProductManagerContext _productMngContext;
    public UserController(ProductManagerContext productMngContext) => _productMngContext = productMngContext;


    [Route("register")]
    [HttpPost]
    public async Task<IActionResult> Register(User model)
    {
        try
        {
            model.CreateDate = DateTime.Now;
            _productMngContext.User.Add(model);
            await _productMngContext.SaveChangesAsync();
            return Ok(model);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

}