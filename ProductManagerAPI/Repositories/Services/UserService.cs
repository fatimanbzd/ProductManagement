using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;
using ProductManagerAPI.Repositories.IServices;

namespace ProductManagerAPI.Repositories.Services
{

    public class UserService : IUserService
    {
        private readonly ProductManagerContext _context;


        public UserService(ProductManagerContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse> Register(User model)
        {
            model.CreateDate = DateTime.Now;
            _context.User.Add(model);
            await _context.SaveChangesAsync();

            return new ApiResponse
            {
                ErrorMessages = null,
                IsSuccess = true,
            };
        }

        public async Task<ApiResponse<UserRole>> getUserRole(int userId)
        {
            var result = await _context.UserRoles.SingleAsync(x=> x.UserId== userId);

            return new ApiResponse<UserRole>
            {
                ErrorMessages = null,
                IsSuccess = true,
                Result = result
            };
        }
    }
}
