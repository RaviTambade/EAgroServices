using Microsoft.EntityFrameworkCore;
using TransportsAPI.Models;
namespace TransportsAPI.Context;
public class TransportContext : DbContext
{
    public DbSet<Transport> Transports { get; set; }
    private IConfiguration _configuration;
    private string _conString;

    public TransportContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
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
            entity.Property(e=>e.UserId);
        });
        modelBuilder.Entity<Transport>().ToTable("transports");
    }
}



//  transports(
//         transport_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//         office_name VARCHAR(20) NOT NULL,
//         first_name VARCHAR(20) NOT NULL,
//         last_name VARCHAR(20) NOT NULL,
//         location VARCHAR(20) NOT NULL,
//         user_id INT NOT NULL,
   //     CONSTRAINT fk_user6_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    //);