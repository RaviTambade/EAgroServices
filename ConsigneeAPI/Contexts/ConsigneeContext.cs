using ConsigneesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ConsigneesAPI.Context;
public class ConsigneeContext:DbContext
{
public DbSet<Consignee> Consignees {get;set;}
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{
        string conString="server=localhost; database=eagroservicesdb; user=root; password=password";
        optionsBuilder.UseMySQL(conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Consignee>(entity => 
        {
          entity.HasKey(e => e.ConsigneeId);
          entity.Property(e => e.AccountNumber);
          entity.Property(e => e.ConsigneeName);
          entity.Property(e => e.ContactNumber);
          entity.Property(e => e.IFSCCode);
          entity.Property(e => e.Location);


        });

}

}


