export class MerchantShipment {

    constructor(
        public id: number,
        public vehicleNumber: string,
        public kilometers: number,
        public status: string,
        public shipmentDate: string,
        public freightCharges: string
    ) { }
}
