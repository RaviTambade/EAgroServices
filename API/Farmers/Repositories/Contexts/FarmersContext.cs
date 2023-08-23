using Farmers.Entities;
using Microsoft.EntityFrameworkCore;

namespace Farmers.Repositories.Contexts
{
    public class FarmerContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string? _conString;

        public FarmerContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _conString =
                this._configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
        }

        public DbSet<GoodsCollection> GoodsCollections { get; set; }
        public DbSet<Crop> Crops { get; set; }
        public DbSet<CollectionCenter> CollectionCenters { get; set; }
        public DbSet<VerifiedGoodsCollection> VerifiedGoodsCollections { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<ShipmentItem> ShipmentItems { get; set; }
        public DbSet<Transporter> Transporters { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<GoodsCosting> Costing { get; set; }

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
            modelBuilder.Entity<VerifiedGoodsCollection>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CollectionId);
                entity.Property(e => e.Grade);
                entity.Property(e => e.InspectorId);
                entity.Property(e => e.Weight);
                entity.Property(e => e.InspectionDate);
                modelBuilder.Entity<VerifiedGoodsCollection>().ToTable("verifiedgoodscollection");
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
            modelBuilder.Entity<Crop>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title);
                entity.Property(e => e.ImageUrl);
                entity.Property(e => e.Rate);
                modelBuilder.Entity<Crop>().ToTable("crops");
            });
            modelBuilder.Entity<CollectionCenter>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CorporateId);
                entity.Property(e => e.InspectorId);
                modelBuilder.Entity<CollectionCenter>().ToTable("collectioncenters");
            });
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ShipmentItemId);
                entity.Property(e => e.RatePerKg);
                entity.Property(e => e.TotalAmount);
                entity.Property(e => e.PaymentStatus);
                entity.Property(e => e.InvoiceDate);
                modelBuilder.Entity<Invoice>().ToTable("invoices");
            });
            modelBuilder.Entity<ShipmentItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ShipmentId);
                entity.Property(e => e.CollectionId);
                modelBuilder.Entity<ShipmentItem>().ToTable("shipmentitems");
            });
            modelBuilder.Entity<Transporter>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CorporateId);
                entity.Property(e => e.ManagerId);
                modelBuilder.Entity<Transporter>().ToTable("transporters");
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.TransporterId);
                entity.Property(e => e.VehicleType);
                entity.Property(e => e.RtoNumber);
                modelBuilder.Entity<Vehicle>().ToTable("vehicles");
            });
            modelBuilder.Entity<Shipment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.VehicleId);
                entity.Property(e => e.MerchantId);
                entity.Property(e => e.Kilometers);
                entity.Property(e => e.Status);
                entity.Property(e => e.ShipmentDate);
                modelBuilder.Entity<Shipment>().ToTable("shipments");
            });
            modelBuilder.Entity<GoodsCosting>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ShipmentItemId);
                entity.Property(e => e.FreightCharges);
                entity.Property(e => e.LabourCharges);
                entity.Property(e => e.ServiceCharges);
                modelBuilder.Entity<GoodsCosting>().ToTable("goodscosting");
            });
        }
    }
}
