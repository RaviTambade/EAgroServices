export class CollectionDetail {
    constructor(
        public id: number,
        public farmerId: number,
        public farmerName: string,
        public cropName: string,
        public containerType: string,
        public grade: string,
        public quantity: number,
        public inspectorId: number,
        public inspectorName: string,
        public totalWeight: number,
        public netWeight: number,
        public collectionDate: string
    ) { }
}
