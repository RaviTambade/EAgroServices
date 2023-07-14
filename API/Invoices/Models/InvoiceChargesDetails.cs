namespace Invoices.Models
{
    public class InvoiceChargesDetails
    {
        public int Id { get; set; }
        public int FarmerId { get; set; }
        public int CollectionCenterId { get; set; }
        public int TransporterId { get; set; }
        public int CollectionId { get; set; }
        public string VehicleNumber { get; set; }
        public string CropName { get; set; }
        public string Grade { get; set; }
        public string ContainerType { get; set; }
        public int Quantity { get; set; }
        public double TotalWeight { get; set; }
        public double NetWeight { get; set; }
        public double FreightCharges { get; set; }
        public double LabourCharges { get; set; }
        public double ServiceCharges { get; set; }
        public string PaymentStatus { get; set; }

        public double RatePerKg { get; set; }
        public double TotalAmount { get; set; } //{ get => farmerAmount=Math.Round(farmerAmount,2); set=> farmerAmount=value; }
        public DateTime InvoiceDate { get; set; }
    }
}