namespace Transflower.EAgroServices.GoodsCollections.Models
{
    public class VerifiedCollectionDetail
    {
        public int Id { get; set; }
        public int FarmerId { get; set; }
        public string? CropName { get; set; }
        public string ImageUrl { get; set; }
        public string? ContainerType { get; set; }
        public string? Grade { get; set; }
        public int Quantity { get; set; }
        public int InspectorId { get; set; }
        public double TotalWeight { get; set; }
        public double NetWeight { get; set; }
        public DateTime CollectionDate { get; set; }
    }
}
