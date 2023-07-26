export class VerifiedCollection {
    corporateId: number;
  collectionCenterName: string;
    constructor(
        public collectionId:number,
        public grade:string,
        public weight:number,
        public inspectorId:number,
    ){}
}
