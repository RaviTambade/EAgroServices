import { Component, Input } from '@angular/core';
import { EmployeeService } from '../../../Services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
// selectedRole:undefined;
@Input() callFromParent:boolean=false;
isSubmitted = false;
  roles: any = ['Admin','Employee','Farmer',  'Transport', 'Merchant'];

  constructor(public fb: FormBuilder,private svc: EmployeeService) {}

  registrationForm = this.fb.group({
    selectedRole: ['', [Validators.required]],
  });

  changeRole(e: any) {
    this.selectedRole?.setValue(e.target.value, {
      onlySelf: true,
    });
  }


  get selectedRole() {
    return this.registrationForm.get('selectedRole');
  }

  onSubmit(): void {
    console.log(this.registrationForm);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      console.log(this.registrationForm.value);

      this.svc.sendRole(this.registrationForm.value);
    }
  }

//   onSelect(){
//   this.svc.sendRole(this.selectedRole);
//   console.log(this.selectedRole)
// }

}