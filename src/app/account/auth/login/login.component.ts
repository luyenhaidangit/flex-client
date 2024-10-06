import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted:any = false;
  error:any = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['admin', [Validators.required]],
      password: ['Haidang106@', [Validators.required]],
      rememberMe: [true] 
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'database') {
        // this.authenticationService.login(this.f.email.value, this.f.password.value,this.f.rememberMe.value).then((res: any) => {
        //   this.router.navigate(['/dashboard']);
        // })
        //   .catch(error => {
        //     this.error = error ? error : '';
        //   });
        this.authenticationService.login(this.f.userName.value, this.f.password.value,this.f.rememberMe.value)
          .subscribe(
            (response: any) => {
              const authUser = response?.data;
              if (authUser) {
                this.authenticationService.setAuthUser(authUser);
              }
              this.router.navigate(['/dashboard']);
          },
          error => {
            console.error('Login failed', error);
          }
      );
      } else {
        this.authFackservice.login(this.f.userName.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['/dashboard']);
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }
}
