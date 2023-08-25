export class Transporterinvoice {
    constructor(public corporateId:number,
                public date:string,
                public paymentStatus:string,
                public companyName:string,
                public freightCharges:number
                ){}
}
