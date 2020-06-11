import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService, User } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.isLoggedIn();
  }
  canLoad(): Observable<boolean> {
    return this.isLoggedIn();
  }

  private isLoggedIn(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user: User) => !!user),
      tap(async (isUserLoggedIn: boolean) => {
        if (!isUserLoggedIn) {
          await this.router.navigate(['/']);
        }
      })
    );
  }
}
