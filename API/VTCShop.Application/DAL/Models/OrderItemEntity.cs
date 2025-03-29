using System.ComponentModel.DataAnnotations;
namespace VTCShop.Application.DAL.Models
{
    public class OrderItemEntity
    {
        public int OrderId { get; set; }
        public OrderEntity OrderEntity { get; set; }

        public int ProductId { get; set; }
        public ProductEntity ProductEntity { get; set; }

        [Range(1, 1000)]
        public int Quantity { get; set; }

        [Range(0.01, 1000000)]
        public decimal UnitPrice { get; set; }
    }
}
