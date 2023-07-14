export class InvoiceDetails {
    constructor(
        public id: number,
        public farmerId: number,
        public farmerName: string,
        public collectionCenterId: number,
        public collectionCenterName: string,
        public transporterId: number,
        public collectionId :number,
        public transporterName: string,
        public vehicleNumber: string,
        public cropName: string,
        public grade: string,
        public containerType: string,
        public quantity: number,
        public totalWeight: number,
        public netWeight: number,
        public freightCharges: number,
        public labourCharges: number,
        public serviceCharges: number,
        public paymentStatus: string,
        public ratePerKg: number,
        public totalAmount: number,
        public invoiceDate: string
    ) { }
}
