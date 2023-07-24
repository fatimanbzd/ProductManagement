using System.ComponentModel.DataAnnotations;

namespace ProductManagerAPI.Data.Entities;

public class Customer
{
    [Key]
    public int Id { get; set; }
    public required string Code { get; set; }
    public required string FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
}