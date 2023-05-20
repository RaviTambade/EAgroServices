import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FarmerAuthGuard implements CanActivate {
  constructor(private authsvc:AuthService,private router:Router,){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role=this.authsvc.getRoleFromToken();
    const farmerId=this.authsvc.getFarmerIdFromToken();
    console.log(route)
    const urlId= route.paramMap.get('id');
    console.log(farmerId)
    console.log(urlId)
    console.log(role)
    if(role=="farmer" && farmerId.toString()==urlId && this.authsvc.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['guest/login']);
    return false;
    }
  }
  
}
