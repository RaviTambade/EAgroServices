using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace VendorsAPI.Models;
public class SellsBilling
{
    private double freightCharges;

    [Column("id")]
    public int Id { get; set; }

    [Column("sellid")]
    public int SellId { get; set; }

    [Column("freightcharges")]
    public double FreightCharges { get => freightCharges=Math.Round(freightCharges,2); set => freightCharges = value; }

    [Column("labourcharges")]
    public int LabourCharges { get; set; }

    [Column("totalcharges")]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public int TotalCharges { get; set; }

    [Column("totalamount")]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public int TotalAmount { get; set; }

    [Column("date")]
    public DateTime Date { get; set; }

    public SellsBilling(){
        Date=DateTime.Now;
    }
}