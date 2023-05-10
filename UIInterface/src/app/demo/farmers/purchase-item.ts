export class PurchaseItem {
constructor(public purchaseId:number,public farmerId:number,public varityId:number,public containerType:string,public quantity:number,
    public grade:string,public totalWeight:number,public tearWeight:number,public netWeight:number,public ratePerKg:number,public amount:number,public date:Date){}
}
