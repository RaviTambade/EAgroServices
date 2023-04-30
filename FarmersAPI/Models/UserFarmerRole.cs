using System.ComponentModel.DataAnnotations.Schema;
namespace FarmersAPI.Models;
public class UserFarmerRole{
    public User user { get; set; }
    public Farmer farmer { get; set; }
    public UserRole userRole { get; set; }
}