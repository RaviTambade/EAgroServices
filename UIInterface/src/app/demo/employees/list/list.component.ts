import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
selectedRole:undefined;
constructor(private svc:EmployeeService){}

  onSelect(){
  this.svc.sendRole(this.selectedRole);
  console.log(this.selectedRole)
}

}
