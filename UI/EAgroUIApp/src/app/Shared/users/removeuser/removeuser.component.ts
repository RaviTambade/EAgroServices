import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-removeuser',
  templateUrl: './removeuser.component.html',
  styleUrls: ['./removeuser.component.css']
})
export class RemoveuserComponent {
  user:User ;
  userId:number |any;
  constructor(private svc:UserService){
    this.user={
      id: 0,
      aadharId: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      contactNumber: ''
    }
    this.userId=4;
  }
    ngOnInit(): void {
    }
    removeUser(){
      this.svc.removeUser(this.userId).subscribe((response)=>{
        console.log(response)
       })
    }
    receiveUser($event:any){
    this.user=$event.user
    }
}
