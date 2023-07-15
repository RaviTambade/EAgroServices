import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NameId } from './name-id';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  constructor(private http: HttpClient) { }

  getCorporates(id:string): Observable<NameId[]> {
    let url = "http://localhost:5041/api/corporates/names/"+id;
    return this.http.get<NameId[]>(url);
  }
}
