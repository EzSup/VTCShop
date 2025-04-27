namespace VTCShop.Application.Contracts.Cart
{
    public class OrderInListResponse
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public decimal TotalAmount { get; set; }
        public string ShippingAddress { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public List<OrderItemResponse> OrderItems { get; set; }
    }
}
