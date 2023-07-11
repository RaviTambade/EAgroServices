export class ShipmentItemDetails {
    constructor(
        public id: number,
        public collectionCenterId: number,
        public collectionCenterName: string,
        public farmerId: number,
        public cropName: string,
        public grade: string,
        public containerType: string,
        public quantity: number,
        public totalWeight: number,
        public netWeight: number,
        public collectionDate: string

    ) { }
}
