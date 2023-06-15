export class Sell {
    constructor(
                public id:number,
                public collectionId:number,
                public merchantId:number,
                public vehicleId:number,
                public quantity:number,
                public netWeight:number,
                public ratePerKg:number,
                public date:string){}
}
