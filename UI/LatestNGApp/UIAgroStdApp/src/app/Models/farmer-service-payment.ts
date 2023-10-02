export class FarmerServicePayment {
    constructor(
        public collectionId: number,
        public transactionId: number,
        public amount: number,
        public paymentFor: string
    ) { }
}
