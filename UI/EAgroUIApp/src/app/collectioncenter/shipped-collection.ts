export class ShippedCollection {
    constructor(
        public collectionId: number,
        public merchantCorporateId: number,
        public merchantName: string,
        public collectionCenterCorporateId: number,
        public collectionCenterName: string,
        public transporterCorporateId: number,
        public transporteName: string,
        public farmerId: number,
        public farmerName: string,
        public cropName: string,
        public vehicleNumber: string,
        public grade: string,
        public containerType: string,
        public quantity: number,
        public totalWeight: number,
        public netWeight: number,
        public collectionDate: string,
        public shipmentDate: string
    ) { }
}
