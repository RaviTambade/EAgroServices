using Transflower.EAgroServices.Farmers.Entities;
using Microsoft.EntityFrameworkCore;
namespace Transflower.EAgroServices.Farmers.Contexts;
public class FarmerContext : DbContext
{
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
    public FarmerContext(DbContextOptions options)
   : base(options)
    {
        CollectionCenters = Set<CollectionCenter>();
        GoodsCollections = Set<GoodsCollection>();
        VerifiedGoodsCollections = Set<VerifiedGoodsCollection>();
        Crops = Set<Crop>();
        Invoices = Set<Invoice>();
        ShipmentItems = Set<ShipmentItem>();
        Transporters = Set<Transporter>();
        Vehicles = Set<Vehicle>();
        Shipments = Set<Shipment>();
        Costing = Set<GoodsCosting>();
    }
}

