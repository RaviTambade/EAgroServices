import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NameId } from '../Models/name-id';
import { Corporation } from '../Models/corporation';

@Injectable({
  providedIn: 'root',
})
export class CorporateService {
  constructor(private http: HttpClient) {}

  getCorporates(id: string): Observable<NameId[]> {
    let url = 'http://localhost:5041/api/corporates/names/' + id;
    console.log(url);
    return this.http.get<NameId[]>(url);
  }

  addCorporate(body: any): Observable<boolean> {
    let url = 'http://localhost:5041/api/corporates/';
    return this.http.post<any>(url, body);
  }

  getCorporateIdByPersonId(personId: number): Observable<number> {
    let url = 'http://localhost:5041/api/corporates/person/' + personId;
    return this.http.get<number>(url);
  }
  getCorporateByName(name: string): Observable<Corporation> {
    let url = 'http://localhost:5041/api/corporates/' + name + '/details';
    return this.http.get<Corporation>(url);
  }
  getCorporateDetails(corporateId: number): Observable<Corporation> {
    let url = 'http://localhost:5041/api/corporates/' + corporateId;
    return this.http.get<Corporation>(url);
  }
}
