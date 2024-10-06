import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User;

    constructor(private http: HttpClient,private router: Router) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        return this.getAuthUser();
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(userName: string, password: string,rememberMe: boolean) {
        const body = {
            userName: userName,
            password: password,
            rememberMe: rememberMe
        };
      
        return this.http.post('/auth/login', body);
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend().registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        console.log("lsdjflksdjflksdjfldsjfls")
        localStorage.removeItem('authUser');
    }

    // Set token
    setAuthUser(user: any): void {
        localStorage.setItem('authUser', JSON.stringify(user));
    }

    // Get Token
    getAuthUser(): string | null {
        return localStorage.getItem('authUser');
    }
}

