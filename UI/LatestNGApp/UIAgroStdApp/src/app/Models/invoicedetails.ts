export class Invoicedetails {
        constructor(
            
            public invoiceId: number,
            public farmerId: number,
            public cropName: string,
            public imageUrl: string,
            public quantity: number,
            public weight: number,
            public paymentStatus: string,
            public ratePerKg: number,
            public farmerAmount: number,
            public invoiceDate: string

        ) { }
    }
    
