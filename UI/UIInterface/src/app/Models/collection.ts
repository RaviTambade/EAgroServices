          export class Collection {
    // constructor(public collectionId:number,public farmerId:number,public cropId:number,public containerType:string,public quantity:number,
    //     public grade:string,public totalWeight:number,public tareWeight:number,public netWeight:number,public ratePerKg:number,public amount:number,public date:string){}
    constructor(public farmerId:number,public cropId:number,public containerType:string,public quantity:number,
        public grade:string,public totalWeight:number,public tareWeight:number,public ratePerKg:number){}   
}
