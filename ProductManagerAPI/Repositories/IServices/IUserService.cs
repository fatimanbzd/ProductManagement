

using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Repositories.IServices
{
    public interface IUserService
    {
        Task<ApiResponse<UserRole>> getUserRole(int userId);
        Task<ApiResponse> Register(User model);
    }
}
