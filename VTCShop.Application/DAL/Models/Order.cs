using System.ComponentModel.DataAnnotations;
namespace VTCShop.Application.DAL.Models
{
    public class Order
    {
        public int Id { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Range(0.01, 1000000)]
        public decimal TotalAmount { get; set; }

        [Required]
        public string ShippingAddress { get; set; }

        public string Status { get; set; } = "Pending";

        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
