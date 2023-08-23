export class UpdateCollection {
    constructor(
        public id: number,
        public farmerId: number,
        public cropId: number,
        public containerType: string,
        public quantity: number,
        public weight: number,
    ){}
}
