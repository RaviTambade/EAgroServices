import { Collection } from "./collection";

export class Collectionviewmodel {
    constructor(public collection:Collection,
               public farmerName: string, 
               public cropName: string,
               ) { }
}
