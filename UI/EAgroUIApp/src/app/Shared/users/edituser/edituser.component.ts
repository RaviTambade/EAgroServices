import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {
  user:User={
    id: 0,
    imageUrl: '',
    aadharId: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    contactNumber: ''
  } ;
  userId:number;
  message: string | undefined;
  filename: string |any;
  progress: number = 0;
  url:any="http://localhost:5102/" +this.user.imageUrl
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private svc:UserService,private http:HttpClient){
 
   this.userId=Number(localStorage.getItem("userId"));
  //  this.url="http://localhost:5102/" +this.user.imageUrl
  }
    ngOnInit(): void {
    }

    uploadFile = (files: any) => {
      if (files.length === 0) {
        return;
      }
  
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      console.log(fileToUpload.name.split('.').pop());
      let filename = UUID.UUID() + "." + fileToUpload.name.split('.').pop();
      // this.selectedimage=filename
      // this.user.imageUrl = filename;
      this.http.post('http://localhost:5102/api/fileupload/' + filename, formData, { reportProgress: true, observe: 'events' })
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress && event.total) {
              console.log(event);
            this.progress = Math.round(100 * event.loaded / event.total);
            }
            if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
             this.url = "http://localhost:5102/" + filename;
              this.onUploadFinished.emit(event.body);
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
    } 
    updateUser(){
      this.svc.updateUser(this.userId,this.user).subscribe((response)=>{
        // this.url=this.user.imageUrl
        console.log(response)
       })
    }
    receiveUser($event:any){
    this.user=$event.user
    }
}
