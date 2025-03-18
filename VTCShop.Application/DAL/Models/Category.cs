using System.ComponentModel.DataAnnotations;
namespace VTCShop.Application.DAL.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Назва категорії є обов'язковою")]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        public string? Description { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();
    }
}
