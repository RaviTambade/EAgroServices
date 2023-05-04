using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class MerchantSell
{
    public Sell? Sell{get;set;}
    public string? FullName{get;set;}

}