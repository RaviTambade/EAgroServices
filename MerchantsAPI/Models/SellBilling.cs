using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace MerchantsAPI.Models;
public class SellBilling
{
    [Column("id")]
    public int Id { get; set; }

    [Column("sellid")]
    public int SellId { get; set; }

    [Column("freightcharges")]
    public int FreightCharges { get; set; }

    [Column("labourcharges")]
    public int LabourCharges { get; set; }

    [Column("totalcharges")]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public int TotalCharges { get; set; }
    [Column("totalamount")]
    public double TotalAmount { get; set; }
    [Column("date")]
    public DateTime Date { get; set; }

    public SellBilling(){
        Date=DateTime.Now;
    }
}