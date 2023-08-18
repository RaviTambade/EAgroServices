import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  user: User;
  @Input() contactNumber: string | any;
  progress: number = 0;
  message: string | undefined;
  filename: string |any;
  selectedimage:any
  @Output() public onUploadFinished = new EventEmitter();
  url:string="http://localhost:5102/AkshayTanpure.jpg"
  constructor(private svc: UserService, private router: Router,private http: HttpClient) {
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
    }
  }

  ngOnInit(): void {
    this.user.contactNumber = this.contactNumber;
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
    this.user.imageUrl = filename;
    this.http.post('http://localhost:5102/api/fileupload/' + filename, formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            console.log(event);
            this.progress = Math.round(100 * event.loaded / event.total);
          }
          if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.url = 'http://localhost:5102/' + filename;
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }

  // getImage() {
  //   if (this.filename != undefined)
  //   this.user.imageurl = this.filename;
  //     this.http.get('http://localhost:5102/' + this.filename, { responseType: 'blob' })
  //       .subscribe((res) => {
  //         console.log("🚀 ~ .subscribe ~ res:", res.type);
  //         this.isImageLoading = true;
  //         this.createImageFromBlob(res);
  //         this.isImageLoading = false;
  //       }
  //       );
  // }


// createImageFromBlob(image: Blob) {
//    let reader = new FileReader();
//    reader.addEventListener("load", () => {
//       this.imageToShow = reader.result;
//    }, false);

//    if (image) {
//       reader.readAsDataURL(image);
//    }
//   }
 
  addUser() {
    this.svc.addUser(this.user).subscribe((response) => {
      if (response) {
        this.router.navigate(['/auth/login'])
      }
    })
  }
}
