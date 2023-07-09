
using Invoices.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Invoices.Repositories.Contexts
{
    public class InvoiceContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string? _conString;

        public InvoiceContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _conString =
                this._configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuration));
        }

        public DbSet<Invoice> Invoices { get;set;}
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
              modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ShipmentItemId);
                entity.Property(e => e.RatePerKg);
                entity.Property(e => e.TotalAmount);
                entity.Property(e => e.InvoiceDate);
                modelBuilder.Entity<Invoice>().ToTable("invoices");
            });
        }
    }
}