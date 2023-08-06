

using Microsoft.AspNetCore.Mvc;
using ProductManagerAPI.Data;
using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data.Entities;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ProductManagerAPI.Controllers;

[Route("token")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    public IConfiguration _configuration;
    private readonly ProductManagerContext _productMngContext;
    public AuthenticationController(IConfiguration config, ProductManagerContext productMngContext)
    {
        _configuration = config;
        _productMngContext = productMngContext;
    }

    [HttpGet]
    [Route("Login")]
    public async Task<IActionResult> Login([FromQuery] User user)
    {
        if (user != null && user.Email != null && user.Password != null)
        {
            var _user = await GetUser(user.Email, user.Password);

            if (_user != null)
            {
                var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Id", user.Id.ToString()),
                        new Claim("FirstName", user.FirstName),
                        new Claim("LastName", user.FirstName),
                        new Claim("UserName", user.UserName),
                        new Claim("Email", user.Email)
                    };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpGet]
    public async Task<User> GetUser(string email, string password)
    {
        var result = await _productMngContext.User.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        if (result is null)
            throw new ArgumentException(nameof(email));
        return result;
    }
}