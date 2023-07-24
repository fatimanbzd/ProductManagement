using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagerAPI.Data.Entities;

public class CustomerOrderDetail
{
    [Key]
    public int Id { get; set; }
    [ForeignKey("CustomerOrder")]
    public int CustomerOrderId { get; set; }
    [ForeignKey("Product")]
    public required int ProductId { get; set; }
    public required int Count { get; set; }
    public required decimal Price { get; set; }
    public decimal LiraDailyRate { get; set; }
}