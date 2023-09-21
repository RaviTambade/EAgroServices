export class Shipment {
    constructor(
        public id: string,
        public vehicleId: number,
        public merchantId: number,
        public kilometers: number,
        public status: string,
        public shipmentDate: string
    ) { }
}
