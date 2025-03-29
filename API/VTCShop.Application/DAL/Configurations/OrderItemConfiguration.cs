using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VTCShop.Application.DAL.Models;
namespace VTCShop.Application.DAL.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItemEntity>
    {
        void IEntityTypeConfiguration<OrderItemEntity>.Configure(EntityTypeBuilder<OrderItemEntity> builder)
        {
            builder.HasKey(oi => new { oi.OrderId, oi.ProductId });

            builder.HasOne(oi => oi.OrderEntity)
                   .WithMany(o => o.OrderItems)
                   .HasForeignKey(oi => oi.OrderId);

            builder.HasOne(oi => oi.ProductEntity)
                   .WithMany(p => p.OrderItems)
                   .HasForeignKey(oi => oi.ProductId);
        }
    }
}
