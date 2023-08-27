import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from './credential';
import { UpdatePassword } from './update-password';
import { UpdateContact } from './update-contact';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageKeys } from 'src/app/Models/Enums/local-storage-keys';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  validate(credential: Credential): Observable<any> {
    let url = 'http://localhost:5077/api/authentication/signin';
    return this.httpClient.post<any>(url, credential);
  }

  register(credential: Credential): Observable<boolean> {
    let url = 'http://localhost:5077/api/authentication/register';
    return this.httpClient.post<any>(url, credential);
  }

  updatePassword(credential: UpdatePassword): Observable<boolean> {
    let url = 'http://localhost:5077/api/authentication/update/password';

    return this.httpClient.put<any>(url, credential);
  }

  updateContact(credential: UpdateContact): Observable<boolean> {
    let url = 'http://localhost:5077/api/authentication/update/contactnumber';
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
  
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem(LocalStorageKeys.jwt);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.userId;
    }
    return null;
  }

  redirectToLogin() {
    return this.router.navigateByUrl('/auth/login');
  }

  isTokenHaveRequiredRole(role: string): boolean {
    const roles = this.getRolesFromToken();
    return roles.includes(role);
  }
}
