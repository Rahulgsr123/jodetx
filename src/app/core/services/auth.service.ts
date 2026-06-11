import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

interface ApiUser {
  id: string;
  phone: string;
  role: string;
  status: string;
  isPhoneVerified?: boolean;
}

interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: ApiUser;
}

interface SendOtpResponse {
  success: boolean;
  message: string;
  devOtp?: string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  registrationToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  private readonly baseUrl = `${environment.apiUrl}/auth`;

  sendOtp(phone: string): Observable<SendOtpResponse> {
    return this.http.post<SendOtpResponse>(`${this.baseUrl}/send-otp`, {
      phone,
    });
  }

  verifyOtp(phone: string, otp: string): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.baseUrl}/verify-otp`, {
      phone,
      otp,
    });
  }

  registerPin(phone: string, pin: string, confirmPin: string, registrationToken: string) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register-pin`, {
        phone,
        pin,
        confirmPin,
        registrationToken,
      })
      .pipe(
        tap((response) => {
          this.tokenService.setToken(response.accessToken);
        }),
      );
  }

  login(phone: string, pin: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { phone, pin }).pipe(
      tap((response) => {
        this.tokenService.setToken(response.accessToken);
      }),
    );
  }

  me(): Observable<{ success: boolean; user: ApiUser }> {
    return this.http.get<{ success: boolean; user: ApiUser }>(`${this.baseUrl}/me`);
  }

  logout(): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/logout`, {});
  }

  clearSession(): void {
    this.tokenService.removeToken();
  }
}
