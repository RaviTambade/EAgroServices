using Transflower.EAgroServices.Shipments.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace Transflower.EAgroServices.Shipments.Repositories.Contexts;

public class ShipmentContext : DbContext
{
    public DbSet<Shipment> Shipments { get; set; }
    public DbSet<ShipmentItem> ShipmentItems { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<GoodsCollection> GoodsCollections { get; set; }
    public DbSet<VerifiedCollection> VerifiedCollections { get; set; }
    public DbSet<Crop> Crops { get; set; }
    public DbSet<Merchant> Merchants { get; set; }
    public DbSet<CollectionCenter> CollectionCenters { get; set; }
    public DbSet<TransporterPayment> TransporterPayments { get; set; }
    public DbSet<Transporter> Transporters { get; set; }

    public ShipmentContext(DbContextOptions options)
        : base(options)
    {
        Shipments = Set<Shipment>();
        ShipmentItems = Set<ShipmentItem>();
        Vehicles = Set<Vehicle>();
        GoodsCollections = Set<GoodsCollection>();
        VerifiedCollections = Set<VerifiedCollection>();
        Crops = Set<Crop>();
        Merchants = Set<Merchant>();
        CollectionCenters = Set<CollectionCenter>();
        TransporterPayments = Set<TransporterPayment>();
        Transporters = Set<Transporter>();
    }

    public double TotalFreightCharges(int shipmentId) => throw new NotSupportedException();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder
            .HasDbFunction(
                typeof(ShipmentContext).GetMethod(
                    nameof(TotalFreightCharges),
                    new[] { typeof(int) }
                )!
            )
            .HasName("apply_total_freight_charges");
    }
}
