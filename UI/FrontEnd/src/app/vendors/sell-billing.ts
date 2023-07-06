import { Billing } from "./billing";
import { FreightRate } from "./freight-rate";
import { Sell } from "./sell";

export class SellBilling {
    constructor(
       public sell: {
            collectionId:number,
            merchantId: number,
            vehicleId: number,
            quantity: number,
            netWeight: number,
            ratePerKg: number,
          },
          public freightRate: {
            fromDestination: string,
            toDestination: string,
            kilometers: number,
            ratePerKm: number
          }
    ){}
}
