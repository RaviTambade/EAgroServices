import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Role } from 'src/app/Models/role';
import { UUID } from 'angular2-uuid';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserService } from 'src/app/Services/user.service';
import { UserProfile } from 'src/app/Models/userprofile';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
 export class UserprofileComponent {
  user: UserProfile;
  message: string | undefined;
  progress: number = 0;
  url: string = 'http://localhost:5102/';
  selectedFile: File | undefined;
  selectedImageUrl: string | undefined;
  editingImage: boolean = false;
  defaultImage: string = 'AkshayTanpure.jpg';
  imageurl: string | undefined;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    private usersvc: UserService,
    private authsvc: AuthenticationService,
    private http: HttpClient
  ) {
    this.user = {
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
  }

  ngOnInit(): void {
    const userId = this.authsvc.getUserIdFromToken();
    if (!userId) {
      return;
    }
    this.usersvc.getUser(userId).subscribe((response) => {
      this.user = response;
      this.imageurl = this.url + this.user.imageUrl;
      console.log(response);
    });
  }
  isCorporate(): boolean {
    return (
      this.authsvc.isTokenHaveRequiredRole(Role.collectionmanager) ||
      this.authsvc.isTokenHaveRequiredRole(Role.transporter) ||
      this.authsvc.isTokenHaveRequiredRole(Role.merchant)
    );
  }

  editImage() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
  onFileSelected(event: Event) {
    this.editingImage = true;
    const fileInput = event.target as HTMLInputElement;
    this.selectedFile = fileInput.files?.[0];
    if (this.selectedFile)
      this.selectedImageUrl = URL.createObjectURL(this.selectedFile);
  }

  confirmImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      if (this.user.imageUrl == this.defaultImage) {
        this.user.imageUrl =
          UUID.UUID() + '.' + this.selectedFile.name.split('.').pop();
      }
      formData.append('file', this.selectedFile, this.user.imageUrl);
      this.http
        .post(
          'http://localhost:5102/api/fileupload/' + this.user.imageUrl,
          formData,
          {
            reportProgress: true,
            observe: 'events',
          }
        )
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress && event.total) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            }
            if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.imageurl = this.selectedImageUrl;
            }
          },
        });

      this.selectedFile = undefined;
      this.editingImage = false;
    }
  }
  cancelImage() {
    this.selectedFile = undefined;
    this.editingImage = false;
  }
 }