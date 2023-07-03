export class UpdatePassword {
    constructor(
        public contactNumber:string,
        public oldPassword:string,
        public newPassword:string
    ){ }
}
