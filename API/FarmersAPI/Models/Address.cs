namespace FarmersAPI.Models;
public class Address{
    public int Id{get;set;}
    public string? State{get;set;}
    public string? District{get;set;}
    public string? Tahsil{get;set;}
    public string? Village{get;set;}   
    public int UserId{get;set;}      
}