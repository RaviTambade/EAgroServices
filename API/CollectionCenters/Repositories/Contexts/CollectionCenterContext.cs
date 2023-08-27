using Transflower.EAgroServices.CollectionCenters.Entities;
using Microsoft.EntityFrameworkCore;

namespace Transflower.EAgroServices.CollectionCenters.Repositories.Contexts;

public class CollectionCenterContext : DbContext
{
    public DbSet<CollectionCenter> CollectionCenters { get; set; }
    public DbSet<Inspector> Inspectors { get; set; }

    public CollectionCenterContext(DbContextOptions options)
        : base(options)
    {
        CollectionCenters = Set<CollectionCenter>();
        Inspectors = Set<Inspector>();
    }
}
