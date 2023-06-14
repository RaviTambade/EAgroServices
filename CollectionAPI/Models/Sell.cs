using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace CollectionAPI.Models;
public class Sell{

    [Column("id")]
    public int Id{get;set;}
    
    [Column("collectionid")]
    public int CollectionId{get;set;}

       [Column("merchantid")]
    public int MerchantId{get;set;}

       [Column("vehicleid")]
    public int VehicleId{get;set;}

       [Column("quantity")]
    public int Quantity{get;set;}

       [Column("netweight")]
    public  double NetWeight{get;set;}

       [Column("rateperkg")]
    public double RatePerKg{get;set;}

       [Column("date")]
    public DateTime Date{get;set;}
    public Sell(){
        Date=DateTime.Now;
    }
}