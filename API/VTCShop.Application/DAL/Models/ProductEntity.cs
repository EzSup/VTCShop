using System.ComponentModel.DataAnnotations;
using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Application.DAL.Models
{
    public class ProductEntity
    {
        public int Id { get; set; }

        public string? ImageKey { get; set; }

        [Required(ErrorMessage = "Назва товару є обов'язковою")]
        [StringLength(200)]
        public string Name { get; set; }

        public string? Description { get; set; }
        public string? Features { get; set; }

        [Range(0.01, 1000000)]
        public decimal Price { get; set; }

        public int? CategoryId { get; set; }

        public bool SupportsSizes { get; set; }
        public IEnumerable<SizeEnum> AvailableSizes { get; set; } = [];
        public bool IsSellingFastMarked { get; set; }
        public CategoryEntity? Category { get; set; }

        public List<OrderItemEntity> OrderItems { get; set; } = new List<OrderItemEntity>();
    }

}
