import { PurchaseItem } from "./purchase-item";
import { Purchasebilling } from "./purchasebilling";

export class Purchaseviewmodel {
  constructor(
    public farmerName: string,
    public purchaseBilling: Purchasebilling,
    public purchaseItem: PurchaseItem,
    public varietyName: string
  ){}
}