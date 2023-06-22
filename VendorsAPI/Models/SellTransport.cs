
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VendorsAPI.Models;
 public class SellTransport{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Quantity { get; set; }
    public double NetWeight { get; set;}
    public double RatePerKg { get; set; }
    public DateTime Date { get; set; }
    public string VehicleNumber{get;set;}
 }