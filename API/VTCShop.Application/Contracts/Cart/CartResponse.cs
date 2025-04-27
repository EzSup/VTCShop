namespace VTCShop.Application.Contracts.Cart
{
    public class CartResponse
    {
        public CartItemResponse[] CartItems { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
