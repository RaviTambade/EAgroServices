export class UnverifiedCollection {
    constructor(
        public collectionId: number,
        public farmerId: number,
        public cropId: number,
        public farmerName: string|undefined,
        public cropName: string|undefined,
        public containerType: string,
        public quantity: number,
        public weight: number,
        public collectionDate: string,
    ) { }
}
