export class VehicleCorporateShipment {
    constructor(
        public shipmentId: number,
        public vehicleId: number,
        public corporateId: number,
        public vehicleType: string,
        public rtoNumber: string,
        public kilometers: string,
        public status: string,
        public shipmentDate: string,
        public companyName: string
    ) { }
}
