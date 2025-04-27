using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
namespace VTCShop.Application.DAL.Models
{
    public class ApplicationUserEntity : IdentityUser<int>
    {
        [StringLength(50)]
        public string? FullName { get; set; }

        public List<UserCartItemEntity> CartItems { get; set; }
        public List<OrderEntity> Orders { get; set; } = new List<OrderEntity>();
    }
}
