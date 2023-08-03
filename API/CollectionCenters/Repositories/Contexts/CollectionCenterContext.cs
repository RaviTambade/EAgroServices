using CollectionCenters.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace CollectionCenters.Repositories.Contexts
{
    public class CollectionCenterContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string? _conString;

        public CollectionCenterContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _conString =
                this._configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuration));
        }

        public DbSet<CollectionCenter> CollectionCenters { get; set; }
        public DbSet<GoodsCollection> GoodsCollections { get; set; }
        public DbSet<GoodsServicesPayment> GoodsServicesPayments { get; set; }
        public DbSet<Payment> Payments { get; set; }
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
            modelBuilder.Entity<CollectionCenter>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CorporateId);
                entity.Property(e => e.InspectorId);
                modelBuilder.Entity<CollectionCenter>().ToTable("collectioncenters");
            });

            modelBuilder.Entity<GoodsServicesPayment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CollectionId);
                entity.Property(e => e.PaymentId);
                modelBuilder.Entity<GoodsServicesPayment>().ToTable("goodsservicespayments");
            });
            modelBuilder.Entity<Crop>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title);
                entity.Property(e => e.ImageUrl);
                entity.Property(e => e.Rate);
                modelBuilder.Entity<Crop>().ToTable("crops");
            });

              modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Amount);
                entity.Property(e => e.TransactionId);
                entity.Property(e => e.Date);
                modelBuilder.Entity<Payment>().ToTable("payments");
            });
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
        }
    }
}
