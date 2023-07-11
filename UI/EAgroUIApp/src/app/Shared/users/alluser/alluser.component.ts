import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent {
  users:User[];
  private subscription: Subscription;
  constructor(private svc:UserService){
    this.users=[];
    this.subscription = new Subscription();
  }
    ngOnInit(): void {
    this.subscription= this.svc.getallUser().subscribe((response)=>{
      this.users=response
     })
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
