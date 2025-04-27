using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VTCShop.Application.DAL.Models;
namespace VTCShop.Application.DAL.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<OrderEntity>
    {
        public void Configure(EntityTypeBuilder<OrderEntity> builder)
        {
            builder.HasOne(o => o.UserEntity)
                   .WithMany(u => u.Orders)
                   .HasForeignKey(o => o.UserId);
        }
    }
}
