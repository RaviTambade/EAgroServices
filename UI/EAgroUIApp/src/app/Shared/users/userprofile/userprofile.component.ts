import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  user: User;
  userId: any;
  url:string="http://localhost:5102/"
  constructor(private svc: UserService) {
    this.user = {
      id: 0,
      imageUrl:'',
      aadharId: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      contactNumber: ''
    };
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.svc.getUser(this.userId).subscribe(
      (response) => {
        this.user = response;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

