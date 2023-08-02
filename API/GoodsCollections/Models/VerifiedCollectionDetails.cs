namespace GoodsCollections.Models
{
    public class VerifiedCollectionDetails
    {
        public int Id { get; set; }
        public int FarmerId { get; set; }
        public string CropName { get; set; } = string.Empty;
        public string ContainerType { get; set; } = string.Empty;
        public string Grade { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public int InspectorId { get; set; }
        public double TotalWeight { get; set; }
        public double NetWeight { get; set; }
        public DateTime CollectionDate { get; set; }
    }
}
