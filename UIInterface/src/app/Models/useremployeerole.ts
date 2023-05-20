import { Employee } from "./employee";
import { User } from "./user";
import { Userrole } from "./userrole";

export class Useremployeerole {
    constructor(public employee:Employee,public user:User,public userRole:Userrole){}

}
