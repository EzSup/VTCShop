using Mapster;
using VTCShop.Application.DAL.Models;
using VTCShop.Contracts;
namespace VTCShop.Application.Mapping
{
    public class MappingConfig : IRegister
    {

        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Product, ProductInListResponse>()
                  .Map(dest => dest.ImageLink, src => src.ImageKey)
                  .Map(dest => dest.Title, src => src.Name)
                  .Map(dest => dest.Price, src => src.Price)
                  .TwoWays();

            config.NewConfig<ProductUpdateRequest, Product>()
                  .Map(dest => dest.Id, src => src.id)
                  .TwoWays();
        }
    }
}
