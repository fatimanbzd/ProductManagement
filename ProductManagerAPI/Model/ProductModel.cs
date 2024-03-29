﻿namespace ProductManagerAPI.Model
{
    public class ProductModel
    {
        public int? Id { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public int? Weight { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
    }
}
