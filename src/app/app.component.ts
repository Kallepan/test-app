import { Component, OnDestroy } from '@angular/core';
import { AuthService, User } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';
  user: User = {
    id: '',
    name: '',
    displayName: '',
  };

  constructor(
    private _authService: AuthService,
    private router: Router) {
    router.events.pipe(
      tap(() => {
        this.user = this._authService.userData;
        console.log({ user: this.user });
      }),
    );
  }
}
