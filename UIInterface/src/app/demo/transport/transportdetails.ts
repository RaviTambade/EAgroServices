import { FreightRate } from "./freight-rate";
import { Sellbilling } from "./sellbilling";
import { Transport } from "./transport";
import { Truck } from "./truck";

export class Transportdetails {
    constructor(
        public transport:Transport,
        public frieghtRate:FreightRate,
        public trucks:Truck,
        public sellBilling:Sellbilling
    ){}

}
