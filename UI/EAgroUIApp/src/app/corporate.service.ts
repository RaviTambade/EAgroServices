import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  constructor(private http: HttpClient) { }

  getCorporates(id:string): Observable<any> {
    let url = "http://localhost:5041/api/corporates/names/"+id;
    return this.http.get<any>(url);
  }
}
