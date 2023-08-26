import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { UUID } from 'angular2-uuid';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent {
  user: User = {
    id: 0,
    imageUrl: '',
    aadharId: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    contactNumber: '',
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
    private authsvc: AuthService
  ) {}
  ngOnInit(): void {
    this.userId = this.authsvc.getUserIdFromToken();
    if (!this.userId) {
      return;
    }
    this.svc.getUser(this.userId).subscribe((response) => {
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
