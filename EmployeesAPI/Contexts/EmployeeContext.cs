using EmployeesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeesAPI.Context;
public class EmployeeContext:DbContext
{
  private readonly IConfiguration _configuration;
  private readonly string _conString;

  public EmployeeContext(IConfiguration configuration){
    _configuration=configuration;
    _conString=_configuration.GetConnectionString("DefaultConnection");
  }
public DbSet<Employee> Employee {get;set;}
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{
        optionsBuilder.UseMySQL(_conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Employee>(entity => 
        {
          entity.HasKey(e => e.EmployeeId);
          entity.Property(e => e.FirstName);
          entity.Property(e => e.LastName);
          entity.Property(e => e.Location);
          entity.Property(e=>e.Salary);
          entity.Property(e =>e.UserId);
          modelBuilder.Entity<Employee>().ToTable("employees");
        });

}

}

