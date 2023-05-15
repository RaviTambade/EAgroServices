using Microsoft.EntityFrameworkCore;
using TransportsAPI.Models;
namespace TransportsAPI.Context;
public class TransportContext : DbContext
{
    private IConfiguration _configuration;
    private string _conString;

    public TransportContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Transport> Transports { get; set; }
    public DbSet<Truck> Trucks { get; set; } 
    public DbSet<Sell> Sells { get; set; } 
    public DbSet<FreightRate> FreightRates { get; set; } 
    public DbSet<Billing> Billings { get; set; } 


    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public object Sellbillings { get; internal set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //  string conString = "server=localhost; database=eagroservicesdb; user=root; password=password";  
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Transport>(entity =>
        {
            entity.HasKey(e => e.TransportId);
            entity.Property(e => e.OfficeName);
            entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.UserId);
            modelBuilder.Entity<Transport>().ToTable("transports");
        });
        modelBuilder.Entity<User>(entity =>
       {
           entity.HasKey(e => e.UserId);
           entity.Property(e => e.ContactNumber);
           entity.Property(e => e.Password);
           modelBuilder.Entity<User>().ToTable("users");
       });
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId);
            entity.Property(e => e.RoleId);
            modelBuilder.Entity<UserRole>().ToTable("user_roles");
        });
        modelBuilder.Entity<Truck>(entity =>
       {
           entity.HasKey(e => e.TruckId);
           entity.Property(e => e.TransportId);
           entity.Property(e => e.TruckNumber);
           modelBuilder.Entity<Truck>().ToTable("transport_trucks");
       });
        modelBuilder.Entity<Sell>(entity =>
      {
          entity.HasKey(e => e.SellId);
          entity.Property(e => e.PurchaseId);
          entity.Property(e => e.MerchantId);
          entity.Property(e => e.TruckId);
          entity.Property(e => e.NetWeight);
          entity.Property(e => e.Quantity);
          entity.Property(e => e.RatePerKg);
          entity.Property(e => e.TotalAmount);
          entity.Property(e => e.Date);

          modelBuilder.Entity<Sell>().ToTable("sells");
      });
        modelBuilder.Entity<FreightRate>(entity =>
   {
       entity.HasKey(e => e.BillId);
       entity.Property(e => e.FromDestination);
       entity.Property(e => e.ToDestination);
       entity.Property(e => e.Kilometers);
       entity.Property(e => e.RatePerKm);
       modelBuilder.Entity<FreightRate>().ToTable("freight_rates");
   });
        modelBuilder.Entity<Billing>(entity =>
{
        entity.HasKey(e => e.BillId);
        entity.Property(e => e.SellId);
        entity.Property(e => e.FreightCharges);
        entity.Property(e => e.LabourCharges);
        entity.Property(e => e.TotalCharges);
        entity.Property(e => e.Date);
    modelBuilder.Entity<Billing>().ToTable("sells_billing");

});
    }
}
