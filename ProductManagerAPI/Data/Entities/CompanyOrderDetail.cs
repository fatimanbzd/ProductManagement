using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagerAPI.Data.Entities;

public class CompanyOrderDetail
{
    [Key]
    public int Id { get; set; }
    [ForeignKey("CompanyOrder")]
    public int CompanyOrderId { get; set; }
    [ForeignKey("Product")]
    public required int ProductId { get; set; }
    public virtual required CustomerOrder CustomerOrder { get; set; }
    public required int Count { get; set; }
    public required decimal Price { get; set; }

}