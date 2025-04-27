using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Contracts
{
    public record ProductCreateRequest(string Name, string? Description, string? Features, decimal Price, int? CategoryId, bool SupportsSizes, List<SizeEnum> AvailableSizes);
}
