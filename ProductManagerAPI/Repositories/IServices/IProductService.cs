using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Repositories.IServices
{
    public interface IProductService
    {
        Task AddProduct(Product product);
        Task DeleteProduct(int id);
        Task<List<Product>> GetAllProducts();
        Task<ApiResponse<Product>> GetProductById(int id);
        Task UpdateProduct(Product product);
    }
}
