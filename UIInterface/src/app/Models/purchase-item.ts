export class PurchaseItem {
constructor(public purchaseId:number,public farmerId:number,public varietyId:number,public containerType:string,public quantity:number,
    public grade:string,public totalWeight:number,public tareWeight:number,public netWeight:number,public ratePerKg:number,public amount:number,public date:string){}
}