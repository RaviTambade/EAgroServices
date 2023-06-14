export class Collectionbill {
    constructor(
        public billId:number,
        public labourCharges:number,
        public amount:number,
        public farmerName:string,
        public billingDate:string,
        public collectionDate:string,
    ){}
}
