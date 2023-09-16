import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from '../Models/credential';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../Models/local-storage-keys';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient:HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
    ) { }
  validate(credential: Credential): Observable<any> {
    let url = 'http://localhost:5077/api/authentication/signin';
    return this.httpClient.post<any>(url, credential);
  }

  getContactNumberFromToken(): string | null {
    const token = localStorage.getItem("JWT");
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.contactNumber;
    }
    return null;
  }


  
  // getRolesFromToken(): string[] {
  //   const token = localStorage.getItem(LocalStorageKeys.jwt);
  //   if (token) {
  //     const decodedToken = this.jwtHelper.decodeToken(token);
  //     const roles = decodedToken.role;

  //     if (Array.isArray(roles)) {
  //       return roles;
  //     } else if (typeof roles === 'string') {
  //       return [roles];
  //     }
  //   }
  //   return [];
  // }

   isAuthenticated(): boolean {
    const token = localStorage.getItem(LocalStorageKeys.jwt);
    return !this.jwtHelper.isTokenExpired(token);
   }
  
  // getUserIdFromToken(): number{
  //    const userId = Number(localStorage.getItem("userId"));
  //   // if (token) {
  //   //   const decodedToken = this.jwtHelper.decodeToken(token);
  //   //   return decodedToken.userId;
  //   // }
  //    return userId;
  // }

  redirectToLogin() {
    return this.router.navigateByUrl('/auth/login');
  }

  // isTokenHaveRequiredRole(role: string): boolean {
  //   const roles = this.getRolesFromToken();
  //   return roles.includes(role);
  // }

}
