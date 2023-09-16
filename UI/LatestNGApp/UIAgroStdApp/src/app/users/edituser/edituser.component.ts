import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserProfile } from 'src/app/Models/userprofile';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {
  user: UserProfile = {
    imageUrl: '',
    aadharId: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    contactNumber: '',
    id: 0
  };
  userId: number | null = null;
  message: string | undefined;
  filename: string | any;
  progress: number = 0;
  url: any = 'http://localhost:5102/' + this.user.imageUrl;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(
    private svc: UserService,
    private http: HttpClient,
  ) {}
  ngOnInit(): void {
    // this.userId = this.authsvc.getUserIdFromToken();
    // if (!this.userId) {
    //   return;
    // }
    this.svc.getUser().subscribe((response) => {
      this.user = response;
      console.log(response);
    });
  }

  

  updateUser() {
    if (!this.userId) {
      return;
    }
    this.svc.updateUser(this.userId, this.user).subscribe((response) => {
      // this.url=this.user.imageUrl
      console.log(response);
    });
  }
}


