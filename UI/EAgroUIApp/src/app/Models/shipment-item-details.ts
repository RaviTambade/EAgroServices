export class ShipmentItemDetails {
    constructor(
        public id: number,
        public collectionCenterCorporaterId: number,
        public farmerId: number,
        public collectionCenterName: string,
        public farmerName: string,
        public cropName: string,
        public grade: string,
        public containerType: string,
        public quantity: number,
        public totalWeight: number,
        public netWeight: number,
        public collectionDate: string

    ) { }
}
