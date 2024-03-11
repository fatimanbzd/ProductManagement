

using Microsoft.AspNetCore.Mvc;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;
using ProductManagerAPI.Repositories.IServices;

namespace ProductManagerAPI.Controllers;

[Route("user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService) => _userService = userService;


    [Route("register")]
    [HttpPost]
    public async Task<IActionResult> Register(User model)
    {
        try
        {
            var result= await _userService.Register(model);
            return Ok(result);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

}