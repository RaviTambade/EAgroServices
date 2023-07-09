
using CollectionCenters.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace CollectionCenters.Repositories.Contexts
{
    public class CollectionCenterContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string? _conString;

        public CollectionCenterContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _conString =
                this._configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuration));
        }
        public DbSet<CollectionCenter> CollectionCenters {get; set;}

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
                modelBuilder.Entity<CollectionCenter>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CorporateId);
                entity.Property(e => e.InspectorId);
                modelBuilder.Entity<CollectionCenter>().ToTable("collectioncenters");
            });
        }
    }
}