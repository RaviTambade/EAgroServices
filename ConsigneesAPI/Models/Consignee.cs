using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.X509Certificates;

namespace ConsigneesAPI.Models;

public class Consignee
{
[Column("consignee_id")]
public int ConsigneeId{get;set;}

[Column("first_name")]
public string FirstName{get;set;}

[Column("last_name")]
public string LastName{get;set;}

[Column("company_name")]
public string CompanyName{get;set;}

[Column("contact_number")]
public string ContactNumber{get;set;}

[Column("location")]
public string Location{get;set;}

[Column("credit_balance")]
public double CreditBalance{get;set;}
[Column("debit_balance")]
 public double DebitBalance{get;set;}
 [Column("balance")]
 public double  Balance{get;set;}

}