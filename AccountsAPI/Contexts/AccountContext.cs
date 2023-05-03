using System.Reflection.Emit;
using System.Diagnostics;
using AccountsAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace AccountsAPI.Context;
public class AccountContext:DbContext{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public AccountContext(IConfiguration configuration){
        _configuration=configuration;
        _conString=_configuration.GetConnectionString("DefaultConnection");

    }
    public DbSet<Account> Accounts{get;set;}
    // public  DbSet<UserAccount> UserAccount {get;set;}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Account>(entity=>
        {

            entity.HasKey(e=>e.AccountId);
            entity.Property(e=>e.AccountNumber);
            entity.Property(e=>e.IfscCode);
            entity.Property(e => e.UserId);
         modelBuilder.Entity<Account>().ToTable("accounts");
          });
//         {
//         modelBuilder.Entity<UserAccount>(entity=>{
//             entity.HasKey(e=>e.Id);
//             entity.Property(e=>e.AccountId);
//             entity.Property(e=>e.UserId);
//         });
//         modelBuilder.Entity<UserAccount>().ToTable("user_accounts");

// } base.OnModelCreating(modelBuilder);     // Calls the base implementation
        // modelBuilder.Entity<Farmer>(entity =>     // Configures the Farmer entity
        // {
        //     entity.HasKey(e => e.FarmerId);      // Defines the primary key of farmer
        //     entity.Property(e => e.FirstName);   // Defines a property 
        //     entity.Property(e => e.LastName);
        //     entity.Property(e => e.Location);
        //     entity.Property(e => e.UserId);
        //     modelBuilder.Entity<Farmer>().ToTable("farmers");  // Maps the Farmer entity to a table named "farmers"
        // });
}
 }
