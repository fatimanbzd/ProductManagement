using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Data;

public interface IProductManagerContext
{
    DbSet<Product> Product { get; set; }
    DbSet<Customer> Customer { get; set; }
    DbSet<CompanyOrder> CompanyOrder { get; set; }
    DbSet<CustomerOrder> CustomerOrder { get; set; }
    DbSet<User> User { get; set; }
}

public class ProductManagerContext : DbContext, IProductManagerContext
{
    public ProductManagerContext(DbContextOptions<ProductManagerContext> options) : base(options) { }

    public virtual DbSet<Product> Product { get; set; }
    public virtual DbSet<Customer> Customer { get; set; }
    public virtual DbSet<CompanyOrder> CompanyOrder { get; set; }
    public virtual DbSet<CustomerOrder> CustomerOrder { get; set; }
    public virtual DbSet<User> User { get; set; }
}