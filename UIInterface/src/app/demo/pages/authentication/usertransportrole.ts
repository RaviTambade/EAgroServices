import { Transport } from "./transport";
import { User } from "./user";
import { Userrole } from "./userrole";

export class Usertransportrole {
    constructor(public transport:Transport,public user:User,public userRole:Userrole){}
}
