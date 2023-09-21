export class Verifiedcollectiondetails {
constructor(
    public farmerId:number,
    public cropName:string,
    public imageUrl: string,
    public containerType:string,
    public Grade:string,
    public quantity:number,
    public inspectorId:number,
    public totalWeight:number,
    public netWeight:number,
    public collectionDate:string
){}

}
