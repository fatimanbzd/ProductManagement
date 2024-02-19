

using Microsoft.AspNetCore.Mvc;
using ProductManagerAPI.Data;
using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data.Entities;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ProductManagerAPI.Model;

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

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login(LoginModel login)
    {
        if (login != null && login.Email != null && login.Password != null)
        {
            var _user = await GetUser(login.Email, login.Password);

            if (_user != null)
            {
                var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Password", login.Password),
                        new Claim("Email", login.Email)
                    };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new UserModel
                {
                    Token = tokenString,
                    UserName = _user.UserName,
                    FullName = _user.FirstName + " " + _user.LastName,
                    Email = _user.Email,
                });
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
    [Route("currentUser")]
    public async Task<User> GetUser(string email, string password)
    {
        var result = await _productMngContext.User.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        if (result is null)
            throw new ArgumentException(nameof(email));
        return result;

    }

}