
import { Merchant } from "./merchant";
import { User } from "./user";
import { Userrole } from "./userrole";

export class Usermerchantrole {
   constructor(public merchant:Merchant,public user:User,public userRole:Userrole){}

}