using System.ComponentModel.DataAnnotations;
namespace VTCShop.Application.DAL.Models
{
    public class OrderItem
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Range(1, 1000)]
        public int Quantity { get; set; }

        [Range(0.01, 1000000)]
        public decimal UnitPrice { get; set; }
    }
}
