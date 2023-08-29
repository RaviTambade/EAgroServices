using Transflower.EAgroServices.Merchants.Entities;
using Microsoft.EntityFrameworkCore;
namespace Transflower.EAgroServices.Merchants.Repositories.Contexts;
public class MerchantContext : DbContext
{

    public DbSet<Merchant> Merchants { get; set; }
    public DbSet<Shipment> Shipments { get; set; }

    public MerchantContext(DbContextOptions options)
: base(options)
    {
        Shipments = Set<Shipment>();
        Merchants = Set<Merchant>();
    }
}
