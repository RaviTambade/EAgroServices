export class CollectionCenterInvoiceDetails {
    constructor(
        public farmerId: number,
        public farmerName: string = '',
        public transporterCorporateId: number,
        public merchantCorporateId: number,
        public transporterName: string = '',
        public merchantName: string = '',
        public vehicleNumber: string = '',
        public cropName: string = '',
        public grade: string = '',
        public containerType: string = '',
        public quantity: number,
        public totalWeight: number,
        public netWeight: number,
        public freightCharges: number,
        public labourCharges: number,
        public serviceCharges: number,
        public ratePerKg: number,
        public farmerAmount: number,
        public invoiceDate: string,
    ){}
}
