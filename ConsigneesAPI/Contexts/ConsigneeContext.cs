using ConsigneesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ConsigneesAPI.Context;
public class ConsigneeContext:DbContext
{
  private readonly IConfiguration _configuration;
  private readonly string _conString;

  public ConsigneeContext(IConfiguration configuration){
    _configuration=configuration;
    _conString=_configuration.GetConnectionString("DefaultConnection");
  }
public DbSet<Consignee> Consignees {get;set;}
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{
        optionsBuilder.UseMySQL(_conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Consignee>(entity => 
        {
          entity.HasKey(e => e.ConsigneeId);
          entity.Property(e => e.FirstName);
          entity.Property(e => e.LastName);
          entity.Property(e => e.CompanyName);
          entity.Property(e => e.ContactNumber);
          entity.Property(e => e.Location);
          entity.Property(e => e.CreditBalance);
          entity.Property(e => e.DebitBalance);
          entity.Property(e => e.Balance);
          modelBuilder.Entity<Consignee>().ToTable("consignees");
        });

}

}


