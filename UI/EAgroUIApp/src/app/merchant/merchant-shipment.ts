export class MerchantShipment {

    constructor(
        public id: number,
        public vehicleNumber: string,
        public kilometers: number,
        public deliveryStatus: string,
        public paymentStatus: string,
        public shipmentDate: string,
        public freightCharges: string
    ) { }
}
