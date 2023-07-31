using System.ComponentModel.DataAnnotations.Schema;
namespace Transporters.Models;
public class Payment{
    
    [Column("id")]
    public int Id{get;set;}

    [Column("date")]
    public DateTime Date{get;set;}

    [Column("transactionid")]
    public int TransactionId{get;set;}

    [Column("amount")]
    public double Amount{get;set;}

}