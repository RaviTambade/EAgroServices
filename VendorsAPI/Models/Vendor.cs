using System.ComponentModel.DataAnnotations.Schema;

namespace VendorsAPI.Models;

public class Vendors
{
    [Column("id")]
    public int Id { get; set; }

    [Column("companyname")]
    public string? CompanyName { get; set; }
    [column("transportid")]
    public int TransportId{get;set;}

   
}
