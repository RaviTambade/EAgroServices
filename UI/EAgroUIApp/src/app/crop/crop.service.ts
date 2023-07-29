import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private http:HttpClient) { }

  cropDetails():Observable<any>{
    let url="http://localhost:5250/api/crops";
    return this.http.get<any>(url);
  }
}
