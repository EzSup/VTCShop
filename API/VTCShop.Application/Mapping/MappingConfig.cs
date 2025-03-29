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
                  .Map(dest => dest.ImageLink, src => src.Product.ImageKey);
        }
    }
}
