using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.X509Certificates;

namespace ConsigneesAPI.Models;

public class Consignee
{
[Column("consignee_id")]
public int ConsigneeId{get;set;}
[Column("consignee_name")]

public string ConsigneeName{get;set;}
[Column("contact_number")]

public long ContactNumber{get;set;}
[Column("location")]

public string Location{get;set;}
[Column("account_number")]

public string AccountNumber{get;set;}
[Column("ifsc_code")]

public string IFSCCode{get;set;}

}