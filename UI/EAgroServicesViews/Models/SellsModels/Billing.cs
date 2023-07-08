using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace EAgroServicesViews.Models.SellsModels;
public class Billing
{
    [Column("bill_id")]
    public int BillId { get; set; }

    [Column("sell_id")]
    public int SellId { get; set; }

    [Column("freight_charges")]
    public int FreightCharges { get; set; }

    [Column("labour_charges")]
    public int LabourCharges { get; set; }

    [Column("total_charges")]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public int TotalCharges { get; set; }

    [Column("date")]
    public DateTime Date { get; set; }

    public Billing(){
        Date=DateTime.Now;
    }
}