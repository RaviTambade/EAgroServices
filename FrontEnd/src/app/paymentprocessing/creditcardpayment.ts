import { Cardpayment } from "./cardpayment";
import { Payment } from "./payment";

export class Creditcardpayment {
    constructor(public cardPayment:Cardpayment,
        public payment:Payment){}
}
