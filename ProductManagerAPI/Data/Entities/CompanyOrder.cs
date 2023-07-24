using System.ComponentModel.DataAnnotations;

namespace ProductManagerAPI.Data.Entities;

public class CompanyOrder
{
    [Key]
    public int Id { get; set; }
    public required string OrderNo { get; set; }
    public required string InvoiceNo { get; set; }
    public required decimal Price { get; set; }
    public required DateTime SUbmitDate { get; set; }

    public virtual required ICollection<CompanyOrderDetail> CompanyOrderDetails { get; set; }

}