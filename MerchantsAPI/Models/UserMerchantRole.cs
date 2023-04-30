using System.ComponentModel.DataAnnotations.Schema;
namespace MerchantsAPI.Models;

public class UserMerchantRole
{
    public User? User {get;set;}
    public Merchant? Merchant {get;set;}
    public UserRole? UserRole{get;set;}

}