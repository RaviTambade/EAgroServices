export class Verifiedcollection {
    constructor(public id:number,public collectionCenterName:string, 
        public collectionCenterId:number,public corporateId:number,
        public cropName:string,public imageUrl:string,public containerType:string,
        public quantity:number,public weight:number,public collectionDate:string,
        public grade:string,public verifiedWeight:number,public inspectionDate:string,
        public paymentStatus: string,
        public inspectorId:number){}
}
