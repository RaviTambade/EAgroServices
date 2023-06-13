namespace CollectionAPI.Models;

public class CollectionViewModel
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public string? ContainerType { get; set; }
    public DateTime Date { get; set;}
    public string? FarmerName { get; set; }
    public string? CropName { get; set; }

}
