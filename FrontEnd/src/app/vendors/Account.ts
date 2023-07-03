export class Account{
    constructor(
        public peopleId:number,
        public acctNumber:string,
        public acctType:string,
        public ifscCode:string,
        public balance:number,
        public registeredDate:Date,
   ){}


}