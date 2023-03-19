using System.ComponentModel.DataAnnotations.Schema;

namespace FarmersAPI.Models;
public class Farmer
{
    [Column("farmer_id")]
    public int FarmerId { get; set; }
    [Column("farmer_name")]
    public string FarmerName { get; set; }
    [Column("contact_number")]
    public long ContactNumber { get; set; }
    [Column("password")]
    public string Password { get; set; }
    [Column("location")]
    public string Location { get; set; }
    [Column("account_number")]
    public string AccountNumber { get; set; }
    [Column("ifsc_code")]
    public string IFSCCode { get; set; }
    [Column("credit_balance")]
    public double CreditBalance { get; set; }
    [Column("debit_balance")]
    public double DebitBalance { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    [Column("balance")]
    public double TotalBalance { get; set; }

}