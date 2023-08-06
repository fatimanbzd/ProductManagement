

using Microsoft.AspNetCore.Mvc;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Controllers;

public class UserController : ControllerBase
{
    private readonly ProductManagerContext _productMngContext;
    public UserController(ProductManagerContext productMngContext) => _productMngContext = productMngContext;

    public async Task<IActionResult> Register(User model)
    {
        try
        {
            _productMngContext.Users.Add(model);
            await _productMngContext.SaveChangesAsync();
            return Ok(model);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

}