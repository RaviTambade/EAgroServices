export class TransporterPayment {
    constructor(
        public shipmentId:number,
        public transactionId: number,
        public amount: number,
    ){}
}
