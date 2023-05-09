import { Farmer } from "./farmer";
import { User } from "./user";
import { Userrole } from "./userrole";

export class Insertfarmerrequest {
   constructor(public farmer:Farmer,public user:User,public userRole:Userrole){}
}
