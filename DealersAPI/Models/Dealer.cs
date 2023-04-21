using System.ComponentModel.DataAnnotations.Schema;
namespace DealersAPI.Models;
public class Dealer{
     [Column("dealer_id")]
    public int DealerId{get;set;}

    [Column("first_name")]
    public string? FirstName{get;set;}

    [Column("last_name")]
    public string? LastName{get;set;}

     [Column("company_name")]
    public string? CompanyName{get;set;}

     [Column("contact_number")]
    public string? ContactNumber{get;set;}

    [Column("location")]
    public string? Location{get;set;}
}