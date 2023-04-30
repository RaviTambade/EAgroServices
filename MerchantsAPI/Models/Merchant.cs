using System.ComponentModel.DataAnnotations.Schema;
namespace MerchantsAPI.Models;
public class Merchant
{
    [Column("merchant_id")]
    public int MerchantId { get; set; }

    [Column("first_name")]
    public string FirstName { get; set; }

    [Column("last_name")]
    public string LastName { get; set; }

    [Column("company_name")]
    public string CompanyName { get; set; }

    [Column("user_id")]
    public string UserId { get; set; }
}