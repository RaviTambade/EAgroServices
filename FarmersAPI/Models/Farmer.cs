using System.ComponentModel.DataAnnotations.Schema;
namespace FarmersAPI.Models;
public class Farmer
{
    [Column("farmer_id")]
    public int FarmerId { get; set; }
    [Column("first_name")]
    public string FirstName { get; set; }
     [Column("last_name")]
    public string LastName { get; set; }
    [Column("contact_number")]
    public string ContactNumber { get; set; }
    [Column("password")]
    public string Password { get; set; }
    [Column("location")]
    public string Location { get; set; }
    [Column("credit_balance")]
    public double CreditBalance { get; set; }
    [Column("debit_balance")]
    public double DebitBalance { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    [Column("balance")]
    public double TotalBalance { get; set; }

}