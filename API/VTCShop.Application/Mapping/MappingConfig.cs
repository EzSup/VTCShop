using Mapster;
using VTCShop.Application.Contracts.Cart;
using VTCShop.Application.DAL.Models;
using VTCShop.Contracts;
namespace VTCShop.Application.Mapping
{
    public class MappingConfig : IRegister
    {

        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<ProductEntity, ProductInListResponse>()
                  .Map(dest => dest.ImageLink, src => src.ImageKey)
                  .Map(dest => dest.Title, src => src.Name)
                  .Map(dest => dest.Price, src => src.Price)
                  .TwoWays();

            config.NewConfig<ProductUpdateRequest, ProductEntity>()
                  .Map(dest => dest.Id, src => src.id)
                  .TwoWays();

            config.NewConfig<UserCartItemEntity, CartItemResponse>()
                  .Map(dest => dest.Category, src => src.Product.Category.Name)
                  .Map(dest => dest.ProductName, src => src.Product.Name)
                  .Map(dest => dest.PriceForUnit, src => src.Product.Price)
                  .Map(dest => dest.Sum, src => src.Product.Price * src.Quantity)
                  .Map(dest => dest.ImageLink, src => src.Product.ImageKey)
                  .Map(dest => dest.Size, src => src.ProductSize);

            config.NewConfig<OrderEntity, OrderInListResponse>()
                  .Map(dest => dest.ShippingAddress, src => src.ShippingAddress)
                  .Map(dest => dest.OrderDate, src => src.OrderDate)
                  .Map(dest => dest.TotalAmount, src => src.TotalAmount)
                  .Map(dest => dest.ContactEmail, src => src.UserEntity.Email)
                  .Map(dest => dest.ContactName, src => src.UserEntity.FullName)
                  .Map(dest => dest.Id, src => src.Id);

            config.NewConfig<OrderItemEntity, OrderItemResponse>()
                  .Map(dest => dest.ProductName, src => src.ProductEntity.Name);
        }
    }
}
