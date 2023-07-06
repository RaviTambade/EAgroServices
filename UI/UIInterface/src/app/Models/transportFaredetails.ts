

export class TransportFaredetails {
    constructor(
      public truckNumber:string,
      public fromDestination:string,
      public toDestination:string,
      public kilometers:number,
      public ratePerKm:number,
      public freightCharges:number,
      public date:string,
    ){}

}
