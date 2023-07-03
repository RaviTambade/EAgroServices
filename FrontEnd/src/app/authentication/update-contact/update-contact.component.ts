import { Component } from '@angular/core';
import { UpdateContact } from '../update-contact';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent {
  credential: UpdateContact = {
    oldContactNumber: '',
    newContactNumber: '',
    password: ''
  }
  confirmPassword: any;

  constructor(private svc: AuthService) { }

  onUpdateContact(form: any) {
    if (this.credential.oldContactNumber == '' || this.credential.password == '') {
      alert("please give valid contact or password")
      return;
    }

    this.svc.updateContact(this.credential).subscribe((response) => {
      console.log(response);
      if (response) {
        alert("Contact Number changed")
      }
      else {
        alert("Password is wrong")
      }
    })
  }
}

