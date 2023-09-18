import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UpdatePassword } from '../Models/update-password';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent {
  credential:UpdatePassword={
    oldPassword: '',
    newPassword: ''
  }
   confirmPassword: any;
   constructor(private svc:AuthenticationService){}
   
   onUpdatePassword(form: any) {
     if( this.credential.newPassword=='' ||this.credential.oldPassword==''  ){
       alert("please give valid contact or password")
       return;
     }
     if(this.credential.newPassword.length < 8 || this.confirmPassword.length < 8){
       alert("password should be minimum 8 characters ")
       return;
     }
   
     if (this.credential.newPassword === this.confirmPassword) {
       console.log(form)
 
       this.svc.updatePassword(this.credential).subscribe((response) => {
         console.log(response);
         if (response) {
           alert("Password changed")
         }
         else {
           alert("OldPassword is wrong")
         }
       })
     }  else{
       alert("password dosen't match")
     }
   }
   
 }
 