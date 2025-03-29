using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VTCShop.Application.DAL.Models;
namespace VTCShop.Application.DAL.Configurations
{
    public class UserCartItemConfiguration : IEntityTypeConfiguration<UserCartItemEntity>
    {
        public void Configure(EntityTypeBuilder<UserCartItemEntity> builder)
        {
            builder.HasKey(ci => new
            {
                ci.UserId, ci.ProductId
            });

            builder.HasOne(ci => ci.User)
                   .WithMany(user => user.CartItems)
                   .HasForeignKey(ci => ci.UserId);
        }
    }
}
