export class BankStatement {
    constructor(
        public amount: number,
        public date: string,
        public mode: string,
        public balance: number,
        public description:string
    ) { }
}
