export class Invoice {

    constructor(

        public id: number,
        public farmerId: number,
        public merchantCorporateId:number,
        public merchantName:string,
        public farmerName: string,
        public cropName: string,
        public quantity:number,
        public weight: number,
        public paymentStatus: string,
        public ratePerKg: number,
        public totalAmount: number,
        public invoiceDate: string

    ) { }
}
