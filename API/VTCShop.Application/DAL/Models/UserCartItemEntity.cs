using System.ComponentModel.DataAnnotations;
using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Application.DAL.Models
{
    public class UserCartItemEntity
    {
        public int UserId { get; set; }
        public ApplicationUserEntity User { get; set; }

        public int ProductId { get; set; }
        public SizeEnum ProductSize { get; set; }
        public ProductEntity Product { get; set; }

        [Range(1, 1000)]
        public int Quantity { get; set; }
    }
}
