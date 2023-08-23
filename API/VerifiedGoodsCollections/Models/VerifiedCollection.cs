namespace VerifiedGoodsCollections.Models;
public class VerifiedCollection{
    public int Id{get;set;}
    public int CollectionId{get;set;}
    public string? Grade{get;set;}
    public double Weight{get;set;}
    public int InspectorId{get;set;}
    public DateTime InspectionDate{get;set;}

    public VerifiedCollection(){
        InspectionDate=DateTime.Now;
    }
}