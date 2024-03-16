import { Component } from '@angular/core';
import { LocalStorageKeys } from './Models/Enum/local-storage-keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  isLoggedIn(): boolean {
    let jwt = localStorage.getItem(LocalStorageKeys.jwt)
    return jwt != null;
  }
}
