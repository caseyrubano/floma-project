import {inject, Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { from, map } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  router = inject(Router);
  authService = inject(AuthService);

  canActivate() {
    return from(this.authService.user$).pipe(
      map((user) => {
        if (user) return true;
        this.router.navigateByUrl('/login');
        return false;
      })
    );
  }
}
