using Transflower.Invoices.Entities;
using Microsoft.EntityFrameworkCore;

namespace Transflower.Invoices.Repositories.Contexts;

public class InvoiceContext : DbContext
{
  

    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<Shipment> Shipments { get; set; }
    public DbSet<ShipmentItem> ShipmentItems { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<GoodsCollection> GoodsCollections { get; set; }
    public DbSet<VerifiedCollection> VerifiedCollections { get; set; }
    public DbSet<Crop> Crops { get; set; }
    public DbSet<Merchant> Merchants { get; set; }
    public DbSet<CollectionCenter> CollectionCenters { get; set; }
    public DbSet<GoodsCosting> GoodsCostings { get; set; }
    public DbSet<Transporter> Transporters { get; set; }


    public InvoiceContext(DbContextOptions options)
   : base(options)
    {
        GoodsCollections = Set<GoodsCollection>();
        Invoices = Set<Invoice>();
        Shipments = Set<Shipment>();
        ShipmentItems = Set<ShipmentItem>();
        CollectionCenters = Set<CollectionCenter>();
        Vehicles = Set<Vehicle>();
        Merchants = Set<Merchant>();
        GoodsCostings = Set<GoodsCosting>();
        Crops = Set<Crop>();
        VerifiedCollections = Set<VerifiedCollection>();
        Transporters = Set<Transporter>();
    }
}