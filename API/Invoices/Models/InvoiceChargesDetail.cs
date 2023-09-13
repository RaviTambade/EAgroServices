namespace Transflower.Invoices.Models;

    public class InvoiceChargesDetail
    {
        public int Id { get; set; }
        public int FarmerId { get; set; }
        public int CollectionCenterCorporateId { get; set; }
        public int TransporterCorporateId { get; set; }
        public int CollectionId { get; set; }
        public string? VehicleNumber { get; set; }
        public string? CropName { get; set; }
        public string? ImageUrl { get; set; }
        public string? Grade { get; set; }
        public string? ContainerType { get; set; }
        public int Quantity { get; set; }
        public double TotalWeight { get; set; }
        public double NetWeight { get; set; }
        public double FreightCharges { get; set; }
        public double LabourCharges { get; set; }
        public double ServiceCharges { get; set; }
        public string? PaymentStatus { get; set; }
        public double RatePerKg { get; set; }
        public double FarmerAmount { get; set; }
        public DateTime InvoiceDate { get; set; }
    }

