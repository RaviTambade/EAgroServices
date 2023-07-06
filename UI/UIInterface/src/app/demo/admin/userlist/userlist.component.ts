import { Component } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent {
  sellListStatus: boolean=false;
  updateStatus:boolean = false;
  deleteStatus:boolean=false;

}
