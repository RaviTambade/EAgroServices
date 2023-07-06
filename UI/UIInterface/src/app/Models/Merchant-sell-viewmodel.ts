

export class Merchantsellviewmodel {
    constructor(
                public varietyName:string,
                public containerType:string,
                public grade:string,
                public truckNumber:string,
                public quantity:number,
                public netWeight:number,
                public ratePerKg:number,
                public totalAmount:number,
                public date:string,
        ){}
}
