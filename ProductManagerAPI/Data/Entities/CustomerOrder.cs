using System.ComponentModel.DataAnnotations;

namespace ProductManagerAPI.Data.Entities;

public class CustomerOrder
{
    [Key]
    public int Id { get; set; }
    public required string OrderNo { get; set; }
    public required decimal Price { get; set; }
    public required DateTime SUbmitDate { get; set; }

    public required virtual ICollection<CustomerOrderDetail> CustomerOrderDetails { get; set; }

}