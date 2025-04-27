using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VTCShop.Application.DAL.Models;
namespace VTCShop.Application.DAL.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<CategoryEntity>
    {
        public void Configure(EntityTypeBuilder<CategoryEntity> builder)
        {
            builder.HasIndex(c => c.Name)
                   .IsUnique();
        }
    }
}
