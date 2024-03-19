import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from '../Models/credential';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../Models/Enum/local-storage-keys';
import { UpdatePassword } from '../authentication/Models/update-password';
import { TokenClaims } from '../Models/Enum/tokenclaims';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient:HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
    ) { }
  signIn(credential: Credential): Observable<any> {
    let url = 'http://localhost:5142/api/auth/signin';
    return this.httpClient.post<any>(url, credential);
  }

  getNameIdFromToken(): string | null {
    const token = localStorage.getItem(LocalStorageKeys.jwt);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.nameid;
    }
    return null;
  }


  getContactNumberFromToken(): string | null {
    const token = localStorage.getItem(LocalStorageKeys.jwt);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.contactNumber;
    }
    return null;
  }

  getClaimFromToken(claim:TokenClaims):string|null{
    const token = localStorage.getItem(LocalStorageKeys.jwt);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken[claim];
    }
    return null;
  }

  updatePassword(credential: UpdatePassword): Observable<boolean> {
    let url = 'http://localhost:5077/api/authentication/update/password';

    return this.httpClient.put<any>(url, credential);
  }
  
  getRolesFromToken(): string[] {
    const token = localStorage.getItem(LocalStorageKeys.jwt);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.role;

      if (Array.isArray(roles)) {
        return roles;
      } else if (typeof roles === 'string') {
        return [roles];
      }
    }
    return [];
  }

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
