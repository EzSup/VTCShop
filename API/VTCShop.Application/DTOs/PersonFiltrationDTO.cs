using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Application.DTOs
{
    public class PersonFiltrationDTO
    {
        public int[] categoriesIds { get; set; } = [];
        public decimal maxPrice { get; set; } = decimal.MaxValue;
        public decimal minPrice { get; set; } = decimal.MinValue;
        // public SizeEnum[] sizes { get; set; } = Array.Empty<SizeEnum>();
    }
}
