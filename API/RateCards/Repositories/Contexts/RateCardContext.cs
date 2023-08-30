using Transflower.EAgroServices.RateCards.Entities;
using Microsoft.EntityFrameworkCore;
namespace Transflower.EAgroServices.RateCards.Repositories.Contexts;
public class RateCardContext : DbContext
{
    public DbSet<RateCard> RateCards { get; set; }
    public RateCardContext(DbContextOptions options)
    : base(options)
    {
        RateCards = Set<RateCard>();
    }
}
