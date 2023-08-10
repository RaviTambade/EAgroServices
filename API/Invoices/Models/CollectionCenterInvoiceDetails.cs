
namespace Invoices.Models
{
    public class CollectionCenterInvoiceDetails
    {
        public int FarmerId { get; set; }
        public int TransporterCorporateId { get; set; }
        public int MerchantCorporateId { get; set; }
        public string VehicleNumber { get; set; } =string.Empty;
        public string CropName { get; set; }  =string.Empty;
        public string Grade { get; set; } =string.Empty;
        public string ContainerType { get; set; } =string.Empty;
        public int Quantity { get; set; }
        public double TotalWeight { get; set; }
        public double NetWeight { get; set; }
        public double FreightCharges { get; set; }
        public double LabourCharges { get; set; }
        public double ServiceCharges { get; set; }
        public double RatePerKg { get; set; }
        public double FarmerAmount { get; set; } 
        public DateTime InvoiceDate { get; set; }
    }
}