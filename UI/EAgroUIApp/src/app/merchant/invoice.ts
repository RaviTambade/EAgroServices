export class Invoice {

    constructor(

        public id: number,
        public farmerId: number,
        public farmerName: string,
        public cropName: string,
        public quantity:number,
        public weight: number,
        public ratePerKg: number,
        public totalAmount: number,
        public invoiceDate: string

    ) { }
}
