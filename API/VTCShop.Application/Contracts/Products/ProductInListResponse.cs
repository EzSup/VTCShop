using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Contracts
{
    public class ProductInListResponse
    {
        public int Id { get; set; }
        public string ImageLink { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public bool SupportsSizes { get; set; }
        public List<SizeEnum> AvailableSizes { get; set; }
    }
}
