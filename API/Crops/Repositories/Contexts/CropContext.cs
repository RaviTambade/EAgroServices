using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.Crops.Entities;

namespace Transflower.EAgroServices.Crops.Contexts;

public class CropContext : DbContext
{
    public DbSet<Crop> Crops { get; set; }

    public CropContext(DbContextOptions options)
        : base(options)
    {
        Crops = Set<Crop>();
    }
}
