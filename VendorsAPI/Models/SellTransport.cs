
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VendorsAPI.Models;
 public class SellTransport{
    public string ContainerType{get;set;}
    public string CropTitle{get;set;}
    public string ImageUrl{get;set;}
    public int Quantity { get; set; }
    public double NetWeight { get; set;}
    public DateTime Date { get; set; }
    public string VehicleNumber{get;set;}
 }