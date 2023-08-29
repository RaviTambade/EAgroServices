using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.Transporters.Entities;

namespace Transflower.EAgroServices.Transporters.Repositories.Contexts
{
    public class TransporterContext : DbContext
    {
        public DbSet<Transporter> Transporters { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<TransporterPayment> TransporterPayments { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<GoodsCosting> GoodsCostings { get; set; }
        public DbSet<ShipmentItem> ShipmentItems { get; set; }
        public DbSet<Merchant> Merchants { get; set; }

        public TransporterContext(DbContextOptions options)
            : base(options)
        {
            Transporters = Set<Transporter>();
            Vehicles = Set<Vehicle>();
            TransporterPayments = Set<TransporterPayment>();
            Shipments = Set<Shipment>();
            Payments = Set<Payment>();
            Invoices = Set<Invoice>();
            GoodsCostings = Set<GoodsCosting>();
            ShipmentItems = Set<ShipmentItem>();
            Merchants = Set<Merchant>();
        }

        public double TotalFreightCharges(int shipmentId) => throw new NotSupportedException();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder //Database function registration
                .HasDbFunction(
                    typeof(TransporterContext).GetMethod(
                        nameof(TotalFreightCharges),
                        new[] { typeof(int) }
                    )!
                )
                .HasName("apply_total_freight_charges");
        }
    }
}
