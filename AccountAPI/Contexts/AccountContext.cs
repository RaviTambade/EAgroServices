using System.Reflection.Emit;
using System.Diagnostics;
using AccountAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace AccountAPI.Context;
public class AccountContext:DbContext{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public AccountContext(IConfiguration configuration){
        _configuration=configuration;
        _conString=_configuration.GetConnectionString("DefaultConnection");

    }
    public DbSet<Account> Accounts{get;set;}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Account>(entity=>{
            entity.HasKey(e=>e.AccountId);
            entity.Property(e=>e.AccountNumber);
            entity.Property(e=>e.IfscCode);
        });
        modelBuilder.Entity<Account>().ToTable("accounts");
    }
}



// CREATE TABLE
//     accounts(
//         account_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//         account_number VARCHAR(20),
//         ifsc_code VARCHAR(20)
//     );