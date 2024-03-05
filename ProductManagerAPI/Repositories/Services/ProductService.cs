using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data;
using ProductManagerAPI.Data.Entities;
using ProductManagerAPI.Model;
using ProductManagerAPI.Repositories.IServices;
using System;

namespace ProductManagerAPI.Repositories.Services
{
    public class ProductService : IProductService
    {
        private readonly ProductManagerContext _context;


        public ProductService(ProductManagerContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _context.Product.ToListAsync();
        }
        public async Task<ApiResponse<Product>> GetProductById(int id)
        {
            var result = new ApiResponse<Product>();
            try
            {
                var product = await _context.Product.FindAsync(id);
                if (product == null)
                {
                    result.ErrorMessages.Add("Product is not find");
                    result.IsSuccess = false;
                    return result;
                }

                result.IsSuccess = true;
                result.Result = product;
                return result;
            }
            catch (Exception ex) { throw new Exception(); }
        }
        public async Task AddProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            _context.Product.Add(product);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task DeleteProduct(int id)
        {
            var product = _context.Product.Find(id);
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            _context.Product.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}
