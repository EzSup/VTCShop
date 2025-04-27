using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Application.Contracts.Cart
{
    public class OrderItemResponse
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public SizeEnum ProductSize { get; set; }
    }
}
