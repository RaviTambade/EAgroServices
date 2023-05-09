using System.ComponentModel.DataAnnotations.Schema;
namespace FarmersAPI.Models;
public class UserFarmerRole{
    public User User { get; set; }
    public Farmer Farmer { get; set; }
    public UserRole UserRole { get; set; }

    public override string ToString(){
        return User.ContactNumber + " " + User.Password + " " +Farmer.FirstName + " " +Farmer.LastName + " "+Farmer.Location + " " +UserRole.Id ;
    }
}