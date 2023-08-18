import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {
  user:User ;
  userId:number;
  constructor(private svc:UserService){
    this.user={
      id: 0,
      imageUrl:'',
      aadharId: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      contactNumber: ''
    },
   this.userId=Number(localStorage.getItem("userId"));
  }
    ngOnInit(): void {
    }
    updateUser(){
      this.svc.updateUser(this.userId,this.user).subscribe((response)=>{
        console.log(response)
       })
    }
    receiveUser($event:any){
    this.user=$event.user
    }
}
