export class Farmerinvoice {
    constructor(
        public merchantName:string,
        public collectionCenterCorporateId: number,
        public collectionCenterName: string,
        public transporterCorporateId: number,
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
        public farmerAmount: number,
        public invoiceDate: string
    ) { }
}
