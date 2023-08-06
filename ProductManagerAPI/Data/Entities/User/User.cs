using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagerAPI.Data.Entities;

public class User
{
    [Key]
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required string Password { get; set; }
    public DateTime CreateDate { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? Email { get; set; }

}