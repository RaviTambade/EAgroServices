namespace Farmers.Models

{
    public class CollectionDetails
    {
        public int Id { get; set; }
        public int FarmerId { get; set; }
        public string? CropName { get; set; }
        public string? ContainerType { get; set; }
        public string? Grade { get; set; }
        public int Quantity { get; set; }
        public int ManagerId { get; set; }
        public double TotalWeight { get; set; }
        public double NetWeight { get; set; }
        public DateTime CollectionDate { get; set; }
    }
}
