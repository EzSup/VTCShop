using System.ComponentModel.DataAnnotations;
namespace VTCShop.Application.DAL.Models
{
    public class OrderEntity
    {
        public int Id { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Range(0.01, 1000000)]
        public decimal TotalAmount { get; set; }

        [Required]
        public string ShippingAddress { get; set; }

        public int UserId { get; set; }
        public ApplicationUserEntity UserEntity { get; set; }

        public List<OrderItemEntity> OrderItems { get; set; } = new List<OrderItemEntity>();
    }
}
