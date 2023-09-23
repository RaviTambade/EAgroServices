import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowButtonService {

  private showButtonSubject = new BehaviorSubject<boolean>(true);
  setShowButtonVisibility(value: boolean) {
    this.showButtonSubject.next(value);
  }
  getShowButtonVisibility() {
    return this.showButtonSubject.asObservable();
  }
}
