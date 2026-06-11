import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'acquirerx_access_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setToken(token: string): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  removeToken(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}