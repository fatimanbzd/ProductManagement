namespace ProductManagerAPI.Data.Entities;

public class Product
{
    public int Id { get; set; }
    public required string Code { get; set; }
    public required string Name { get; set; }
    public int? Weight { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
}