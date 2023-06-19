import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient) { }

  getMerchants():Observable<any>{
    let url=" http://localhost:5188/api/Merchants"
    return this.http.get<any>(url)
  }


}
