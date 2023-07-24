using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Data.Entities;

namespace ProductManagerAPI.Data;

public class ProductManagerContext : DbContext
{
    public ProductManagerContext(DbContextOptions<ProductManagerContext> options) : base(options) { }

    public virtual DbSet<Product> Product { get; set; }
    public virtual DbSet<Customer> Customer { get; set; }
    public virtual DbSet<CompanyOrder> CompanyOrder { get; set; }
    public virtual DbSet<CustomerOrder> CustomerOrder { get; set; }

}