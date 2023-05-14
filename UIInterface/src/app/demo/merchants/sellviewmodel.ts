import { PurchaseItem } from "../farmers/purchase-item";
import { SellItem } from "./sell-item";

export class Sellviewmodel {
    constructor(public merchantName:string,
        public purchaseItem:PurchaseItem,
        public sell:SellItem){}
}
