export class PaymentTransferDetails {

    constructor(
        public fromAcct: string,
        public toAcct: string,
        public fromIfsc: string,
        public toIfsc: string,
        public amount: number
    ) { }
}
