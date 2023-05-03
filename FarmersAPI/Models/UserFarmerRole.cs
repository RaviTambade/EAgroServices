using System.ComponentModel.DataAnnotations.Schema;
namespace FarmersAPI.Models;
public class UserFarmerRole{
    public User User { get; set; }
    public Farmer Farmer { get; set; }
    public UserRole UserRole { get; set; }
}