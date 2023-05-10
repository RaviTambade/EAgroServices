import { PurchaseItem } from "./purchase-item";
import { Purchasebilling } from "./purchasebilling";

export class Purchaseviewmodel {
    farmerName: string;
    purchaseBilling: {
        billId: number,
        date: string,
        labourCharges: number,
        purchaseId: number,
        totalAmount: number
    };
    purchaseItem: {
        amount: number,
        containerType: string,
        date: string,
        farmerId: number,
        grade: string,
        netWeight: number,
        purchaseId: number,
        quantity: number,
        ratePerKg: number,
        tareWeight: number,
        totalWeight: number,
        varietyId: number
    };
    varietyName: string;
}
