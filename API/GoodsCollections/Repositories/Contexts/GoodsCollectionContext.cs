
using GoodsCollections.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace GoodsCollections.Repositories.Contexts
{
    public class GoodsCollectionContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string? _conString;

        public GoodsCollectionContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _conString =
                this._configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuration));
        }

        public DbSet<GoodsCollection> GoodsCollections { get; set; }
        public DbSet<Crop> Crops { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(
                _conString ?? throw new InvalidOperationException("Connection string is null.")
            );
            optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
             modelBuilder.Entity<GoodsCollection>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CollectionCenterId);
                entity.Property(e => e.FarmerId);
                entity.Property(e => e.CropId);
                entity.Property(e => e.ContainerType);
                entity.Property(e => e.Quantity);
                entity.Property(e => e.Weight);
                entity.Property(e => e.CollectionDate);
                modelBuilder.Entity<GoodsCollection>().ToTable("goodscollections");
            });
             modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.Rate);
            modelBuilder.Entity<Crop>().ToTable("crops");
        });
        }
    }
}