using Transporters.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Transporters.Repositories.Contexts
{
    public class TransporterContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string? _conString;

        public TransporterContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _conString =
                this._configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuration));
        }

        public DbSet<Transporter> Transporters { get; set; }
        public DbSet<Vehicle> Vehicles{get;set;}
        public DbSet<TransporterPayment> TransporterPayments{get;set;}  
        public DbSet<Shipment> Shipments{get;set;}
        public DbSet<Payment> Payments{get;set;}
        public DbSet<Invoice> Invoices{get;set;}
        public DbSet<GoodsCosting> GoodsCostings{get;set;}  
        public DbSet<ShipmentItem> ShipmentItems{get;set;}

        public double TotalFreightCharges(int shipmentId) => throw new NotSupportedException();
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
            modelBuilder //Database function registration
                .HasDbFunction(
                    typeof(TransporterContext).GetMethod(
                        nameof(TotalFreightCharges),
                        new[] { typeof(int) }
                    )
                )
                .HasName("apply_total_freight_charges");
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Transporter>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CorporateId);
                entity.Property(e => e.ManagerId);
                modelBuilder.Entity<Transporter>().ToTable("transporters");
            });
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
            modelBuilder.Entity<ShipmentItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ShipmentId);
                entity.Property(e => e.CollectionId);
                modelBuilder.Entity<ShipmentItem>().ToTable("shipmentitems");
            });
             modelBuilder.Entity<TransporterPayment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ShipmentId);
                entity.Property(e => e.PaymentId);
                modelBuilder.Entity<TransporterPayment>().ToTable("transporterpayments");
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
              modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Date);
                entity.Property(e => e.TransactionId);
                entity.Property(e => e.Amount);
                modelBuilder.Entity<Payment>().ToTable("payments");
            });
        }
    }
}
