import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private API_URL = environment.api_url;
  private user$ = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;

  get userIsAuthenticated() {
    return this.user$.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userToken() {
    return this.user$.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.API_URL}auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          const expirationDate = this.getExpirationTime(response.expiresIn);
          const user = new User(response.user.id, email, response.token, expirationDate);
          this.user$.next(user);
          this.autoLogout(user.tokenDuration);
          this.storeAuthData(response.userId, email, response.token, expirationDate.toISOString());
        })
      );
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.user$.next(null);
    Storage.remove({ key: 'authData' });
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  async autoLogin() {
    const storedData = await Storage.get({
      key: 'authData',
    });

    if (!storedData || !storedData.value) {
      return null;
    }

    const parsedData = JSON.parse(storedData.value) as {
      userId: number;
      email: string;
      token: string;
      tokenExpirationDate: string;
    };

    const expirationTime = new Date(parsedData.tokenExpirationDate);

    if (expirationTime <= new Date()) {
      return null;
    }

    const user = new User(parsedData.userId, parsedData.email, parsedData.token, expirationTime);
    if (user) {
      this.user$.next(user);
      this.autoLogout(user.tokenDuration);
    }
    return !!user;
  }

  private getExpirationTime(exp: number) {
    const expirationDate = new Date().getTime() + exp * 1000;
    return new Date(expirationDate);
  }

  private storeAuthData(userId: number, email: string, token: string, tokenExpirationDate: string) {
    const data = JSON.stringify({
      userId,
      email,
      token,
      tokenExpirationDate,
    });
    Storage.set({
      key: 'authData',
      value: data,
    });
  }
}

