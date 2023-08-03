
namespace GoodsCollections.Models
{
    public class Collection
    {
        public int CollectionId { get; set; }
        public int FarmerId { get; set; }
        public int CropId { get; set; }
        public string CropName { get; set; } =string.Empty;
        public string ContainerType { get; set; } =string.Empty;
        public int Quantity { get; set; }
        public double Weight { get; set; }
        public DateTime CollectionDate { get; set; }
    }
}