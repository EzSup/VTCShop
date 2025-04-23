using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Contracts
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string ImageLink { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? Features { get; set; }
        public bool SupportsSizes { get; set; }
        public int CategoryId { get; set; }
        public List<SizeEnum> AvailableSizes { get; set; }
    }
}
