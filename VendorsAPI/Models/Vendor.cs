using System.ComponentModel.DataAnnotations.Schema;

namespace VendorsAPI.Models;

public class Vendor
{
    [Column("id")]
    public int Id { get; set; }

    [Column("companyname")]
    public string? CompanyName { get; set; }
[Column("vendorid")]
    public int VendorId{get;set;}

   
}
