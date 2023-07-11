import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  user: User;
  constructor(private svc: UserService) {
    this.user = {
      id: 0,
      aadharId: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      contactNumber: ''
    }
  }

  ngOnInit(): void {
  }
  addUser() {
    this.svc.addUser(this.user).subscribe((response) => {
    console.log(response)
    })
  }
}
