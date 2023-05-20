import { Admin } from "./admin";
import { User } from "./user";
import { Userrole } from "./userrole";

export class Useradminrole {
    constructor(public admin:Admin,public user:User,public userRole:Userrole){}

}
