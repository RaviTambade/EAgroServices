import { Shipment } from "./shipment";

export class Shipmentsmerchant extends Shipment {
    constructor(
        public corporateId: number,
        public companyName: string,
        id: string,
        vehicleId: number,
        merchantId: number,
        kilometers: number,
        status: string,
        shipmentDate: string
    ) {
        super(id,
            vehicleId,
            merchantId,
            kilometers,
            status,
            shipmentDate);
    }
}
