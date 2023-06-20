export class Collectionbill {
    constructor(
        public billId:number,
        public collectionId:number,
        public labourCharges:number,
        public amount:number,
        public farmerName:string,
        public billingDate:string,
        public collectionDate:string,
    ){}
}
