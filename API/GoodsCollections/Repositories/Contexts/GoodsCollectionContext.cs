using Transflower.EAgroServices.GoodsCollections.Entities;
using Microsoft.EntityFrameworkCore;

namespace Transflower.EAgroServices.GoodsCollections.Repositories.Contexts;

public class GoodsCollectionContext : DbContext
{
    
    public DbSet<GoodsCollection> GoodsCollections { get; set; }
    public DbSet<Crop> Crops { get; set; }
    public DbSet<CollectionCenter> CollectionCenters { get; set; }
    public DbSet<VerifiedGoodsCollection> VerifiedGoodsCollections { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<Inspector> Inspectors { get; set; }
    public DbSet<ShipmentItem> ShipmentItems { get; set; }

    public GoodsCollectionContext(DbContextOptions options)
        : base(options)
    {
        GoodsCollections = Set<GoodsCollection>();
        CollectionCenters = Set<CollectionCenter>();
        Crops = Set<Crop>();
        VerifiedGoodsCollections = Set<VerifiedGoodsCollection>();
        Invoices = Set<Invoice>();
        ShipmentItems = Set<ShipmentItem>();
        Inspectors= Set<Inspector>();
    }
}
