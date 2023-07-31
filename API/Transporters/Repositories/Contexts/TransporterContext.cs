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
             modelBuilder.Entity<TransporterPayment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ShipmentId);
                entity.Property(e => e.PaymentId);
                modelBuilder.Entity<TransporterPayment>().ToTable("transporterpayments");
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
