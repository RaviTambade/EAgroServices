using System.ComponentModel.DataAnnotations.Schema;
namespace AdminAPI.Models;
public class UserAdminRole
{
    public User? User {get;set;}
    public Admin? Admin{get;set;}
    public UserRole? UserRole{get;set;}

}