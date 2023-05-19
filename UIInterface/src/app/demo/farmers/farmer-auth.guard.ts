import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class FarmerAuthGuard implements CanActivate {
  constructor(private router:Router){}
  getRole():string{
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.role;
    }
      return '';

  }  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role=this.getRole();
    console.log(role)
    if(role=='farmer'){
      return true;
    }else{
    //   this.router.navigate(['guest/login']);
   this.router.navigateByUrl('guest/login')
    return false;
    }
  }
  
}
