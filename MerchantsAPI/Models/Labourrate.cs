using System.ComponentModel.DataAnnotations.Schema;
namespace MerchantsAPI.Models;
public class LabourRate{
    [Column("containertype")]
    public string ContainerType{get;set;}

    [Column("imageUrl")]
    public string ImageUrl{get;set;}

    [Column("rate")]
    public double Rate{get;set;}

}