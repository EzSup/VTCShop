using System.ComponentModel.DataAnnotations;
namespace VTCShop.Application.DAL.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string? ImageKey { get; set; }

        [Required(ErrorMessage = "Назва товару є обов'язковою")]
        [StringLength(200)]
        public string Name { get; set; }

        public string? Description { get; set; }

        [Range(0.01, 1000000)]
        public decimal Price { get; set; }

        public int Stock { get; set; } = 0;

        public string? ImageUrl { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }

}
