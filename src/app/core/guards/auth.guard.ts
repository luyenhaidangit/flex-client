import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (environment.authType === 'username') {
      const currentUser = this.authenticationService.GetCurrentUser();
      console.log(currentUser);

      // Refresh user info if current user is null
      if (!currentUser) {
        return this.authenticationService.GetUserProfile().pipe(
          map((response: any) => {
            if (response?.isSuccess) {
              this.authenticationService.SetCurrentUser(response?.data?.userInfo);
              return true;
            } else {
              this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
              return false; 
            }
          }),
          catchError(() => {
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
            return of(false);
          })
        );
      }

      return of(true);
    }

    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return of(false);
  }
}
