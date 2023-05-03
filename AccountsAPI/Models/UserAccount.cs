using System.ComponentModel.DataAnnotations.Schema;
namespace AccountsAPI.Models;
public class UserAccount
{
    [Column("id")]
    public int Id { get; set; }
    [Column("account_id")]
    public int AccountId { get; set; }

    [Column("uaser_id")]
    public int UserId { get; set; }


}