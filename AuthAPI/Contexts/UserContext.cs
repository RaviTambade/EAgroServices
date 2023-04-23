using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Reflection.Emit;
using AuthAPI.Models;
namespace AuthAPI.Context;
public class UserContext:DbContext{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
     public UserContext(IConfiguration configuration){
    _configuration=configuration;
    _conString=_configuration.GetConnectionString("DefaultConnection");
    }

     public DbSet<User> Users{get;set;}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
        optionsBuilder.UseMySQL(_conString);
        }
    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>(entity=>{
            entity.HasKey(e=>e.UserId);
            entity.Property(e=>e.ContactNumber);
            entity.Property(e=>e.Password);
        });
        modelBuilder.Entity<User>().ToTable("users");
    }

}





//  users(
//         user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//         contact_number VARCHAR(15) NOT NULL UNIQUE,
//         password varchar(15) NOT NULL
//     );