import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';


export type AuthMode = 'login' | 'register';
export type RegisterStep = 'phone' | 'otp' | 'pin';

interface BrandData {
  logoText: string;
  company: string;
  product: string;
  badge: string;
  tagline: string;
}

interface HeroData {
  headline: string;
  highlightedWords: string[];
  description: string;
}

interface AudienceData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface FeatureData {
  id: string;
  title: string;
  icon: string;
}

interface BrandLogoData {
  id: string;
  label: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  delay: string;
}

interface FieldCopy {
  label: string;
  placeholder: string;
  icon: string;
}

interface FormCopy {
  title: string;
  subtitle: string;
  primaryCta: string;
  loadingCta?: string;
  fields: Record<string, FieldCopy>;
  secondary?: {
    text: string;
    linkText: string;
    action: string;
  }[];
  backText?: string;
  resendText?: string;
}

interface ValidationMessages {
  phoneRequired: string;
  phoneInvalid: string;
  otpRequired: string;
  otpInvalid: string;
  pinRequired: string;
  pinInvalid: string;
  confirmPinRequired: string;
  confirmPinMismatch: string;
  otpSent: string;
  otpVerified: string;
  registrationSuccess: string;
  loginSuccess: string;
}

interface AcquireXLoginData {
  brand: BrandData;
  hero: HeroData;
  audiences: AudienceData[];
  features: FeatureData[];
  brandLogos: BrandLogoData[];
  forms: {
    login: FormCopy;
    registerPhone: FormCopy;
    registerOtp: FormCopy;
    registerPin: FormCopy;
  };
  validations: ValidationMessages;
  links: {
    footerLeft: string;
    footerRight: string[];
  };
}

@Component({
  selector: 'app-login4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login4.html',
  styleUrl: './login4.scss',
})
export class Login4 {
  private readonly fb = inject(FormBuilder);

  

  private readonly authService = inject(AuthService);
private readonly router = inject(Router);

registrationToken = signal('');

  readonly pageData: AcquireXLoginData = {
    brand: {
      logoText: 'Jx',
      company: 'Jodetx',
      product: 'AcquirerX',
      badge: 'The Merchant Acquiring Platform',
      tagline: 'Enterprise-grade acquiring infrastructure',
    },

    hero: {
      headline: 'One secure platform for modern merchant acquiring.',
      highlightedWords: ['secure platform', 'merchant acquiring'],
      description:
        'AcquirerX unifies onboarding, payments, reconciliation and compliance for merchants, co-operative banks and platform admins — behind a single enterprise-grade identity layer.',
    },

    audiences: [
      {
        id: 'merchants',
        title: 'Merchants',
        description: 'Fast onboarding, secure payments, improved cash flow visibility.',
        icon: 'bi-shop',
      },
      {
        id: 'admins',
        title: 'Admins',
        description: 'Real-time transaction tracking, customizable reports, risk mitigation.',
        icon: 'bi-speedometer2',
      },
      {
        id: 'banks',
        title: 'Co-operative Banks',
        description: 'Streamlined acquiring, reduced overhead, enhanced compliance.',
        icon: 'bi-bank',
      },
    ],

    features: [
      {
        id: 'onboarding',
        title: 'Automated Onboarding',
        icon: 'bi-person-check',
      },
      {
        id: 'dashboard',
        title: 'Centralized Dashboard',
        icon: 'bi-grid-1x2',
      },
      {
        id: 'kyc',
        title: 'KYC & Compliance',
        icon: 'bi-shield-check',
      },
      {
        id: 'payments',
        title: 'Payment Processing',
        icon: 'bi-credit-card-2-front',
      },
      {
        id: 'risk',
        title: 'Risk Monitoring',
        icon: 'bi-graph-up-arrow',
      },
      {
        id: 'rcrs',
        title: 'RCRS Reporting',
        icon: 'bi-file-earmark-bar-graph',
      },
    ],

    brandLogos: [
      {
        id: 'visa',
        label: 'VISA',
        position: { top: '8%', left: '6%' },
        delay: '0s',
      },
      {
        id: 'mastercard',
        label: 'Mastercard',
        position: { top: '14%', right: '10%' },
        delay: '0.6s',
      },
      {
        id: 'rupay',
        label: 'RuPay',
        position: { bottom: '22%', left: '4%' },
        delay: '1.2s',
      },
      {
        id: 'upi',
        label: 'UPI',
        position: { bottom: '10%', right: '14%' },
        delay: '0.3s',
      },
      {
        id: 'npci',
        label: 'NPCI',
        position: { top: '44%', left: '1%' },
        delay: '1.5s',
      },
      {
        id: 'amex',
        label: 'AMEX',
        position: { top: '38%', right: '3%' },
        delay: '0.9s',
      },
    ],

    forms: {
      login: {
        title: 'Welcome back',
        subtitle: 'Login securely with your registered phone number and PIN.',
        primaryCta: 'Login Securely',
        loadingCta: 'Authenticating…',
        fields: {
          phone: {
            label: 'Phone Number',
            placeholder: 'Enter 10-digit mobile number',
            icon: 'bi-phone',
          },
          pin: {
            label: 'Secure PIN',
            placeholder: 'Enter your PIN',
            icon: 'bi-shield-lock',
          },
        },
        secondary: [
          {
            text: '',
            linkText: 'Forgot PIN?',
            action: 'forgot',
          },
          {
            text: 'New to AcquirerX?',
            linkText: 'Register now',
            action: 'register',
          },
        ],
      },

      registerPhone: {
        title: 'Create your AcquirerX access',
        subtitle: "Start with your business mobile number. We'll send a one-time OTP.",
        primaryCta: 'Generate OTP',
        loadingCta: 'Sending OTP…',
        fields: {
          phone: {
            label: 'Phone Number',
            placeholder: 'Enter 10-digit mobile number',
            icon: 'bi-phone',
          },
        },
        backText: 'Already registered? Back to login',
      },

      registerOtp: {
        title: 'Verify your number',
        subtitle: 'Enter the secure 6-digit code sent to your registered mobile.',
        primaryCta: 'Verify OTP',
        loadingCta: 'Verifying…',
        fields: {
          otp: {
            label: 'One-Time Password',
            placeholder: 'Enter OTP',
            icon: 'bi-shield-check',
          },
        },
        backText: 'Back',
        resendText: 'Resend OTP',
      },

      registerPin: {
        title: 'Set your secure PIN',
        subtitle: 'Your PIN protects every AcquirerX session. Choose a 4–6 digit code.',
        primaryCta: 'Complete Registration',
        loadingCta: 'Finalising…',
        fields: {
          pin: {
            label: 'Create PIN',
            placeholder: '4 to 6 digits',
            icon: 'bi-key',
          },
          confirmPin: {
            label: 'Confirm PIN',
            placeholder: 'Re-enter your PIN',
            icon: 'bi-key-fill',
          },
        },
        backText: 'Back',
      },
    },

    validations: {
      phoneRequired: 'Phone number is required.',
      phoneInvalid: 'Enter a valid 10-digit Indian mobile starting with 6-9.',
      otpRequired: 'OTP is required.',
      otpInvalid: 'OTP must be 4 or 6 digits.',
      pinRequired: 'PIN is required.',
      pinInvalid: 'PIN must be 4 to 6 numeric digits.',
      confirmPinRequired: 'Please confirm your PIN.',
      confirmPinMismatch: 'PINs do not match.',
      otpSent: 'OTP sent to your registered number.',
      otpVerified: 'Number verified. Set your PIN to continue.',
      registrationSuccess: 'Registration complete. Welcome to AcquirerX.',
      loginSuccess: 'Authenticated. Redirecting to your console…',
    },

    links: {
      footerLeft: '© Jodetx Technologies · AcquirerX Secure Access',
      footerRight: ['Privacy', 'Terms', 'Status'],
    },
  };

  readonly authMode = signal<AuthMode>('login');
  readonly registerStep = signal<RegisterStep>('phone');

  readonly loading = signal(false);
  readonly info = signal('');

  readonly showPin = signal(false);
  readonly showConfirmPin = signal(false);

  readonly stepDots = [0, 1, 2];

  readonly loginForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    pin: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
  });

  readonly registerPhoneForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
  });

  readonly otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(/^(\d{4}|\d{6})$/)]],
  });

  readonly pinForm = this.fb.group(
    {
      pin: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
      confirmPin: ['', [Validators.required]],
    },
    {
      validators: this.confirmPinValidator,
    }
  );

  readonly currentForm = computed<FormCopy>(() => {
    if (this.authMode() === 'login') {
      return this.pageData.forms.login;
    }

    if (this.registerStep() === 'phone') {
      return this.pageData.forms.registerPhone;
    }

    if (this.registerStep() === 'otp') {
      return this.pageData.forms.registerOtp;
    }

    return this.pageData.forms.registerPin;
  });

  readonly stepIndex = computed(() => {
    if (this.authMode() === 'login') {
      return 0;
    }

    if (this.registerStep() === 'phone') {
      return 0;
    }

    if (this.registerStep() === 'otp') {
      return 1;
    }

    return 2;
  });

  readonly headlineSegments = computed(() =>
    this.highlightParts(
      this.pageData.hero.headline,
      this.pageData.hero.highlightedWords
    )
  );

  switchToRegister(): void {
    this.authMode.set('register');
    this.registerStep.set('phone');
    this.clearMessages();
    this.clearRegisterFields();
  }

  switchToLogin(): void {
    this.authMode.set('login');
    this.registerStep.set('phone');
    this.clearMessages();
    this.clearAllForms();
  }

  forgotPin(): void {
    // BACKEND TODO:
    // Later this should call an API like POST /api/auth/forgot-pin
    // with the registered phone number, then open an OTP reset flow.
    console.log('[AcquirerX] forgot PIN');
  }

  handleSecondaryAction(action: string): void {
    if (action === 'register') {
      this.switchToRegister();
      return;
    }

    if (action === 'forgot') {
      this.forgotPin();
    }
  }

  submitLogin(): void {
  this.clearMessages();
  this.loginForm.markAllAsTouched();

  if (this.loginForm.invalid) {
    return;
  }

  const phone = this.loginForm.controls.phone.value ?? '';
  const pin = this.loginForm.controls.pin.value ?? '';

  this.loading.set(true);

  this.authService.login(phone, pin).subscribe({
    next: () => {
      this.loading.set(false);

      // Token is saved inside AuthService.
      // Only after successful backend login, user can enter protected pages.
      this.router.navigate(['/sms']);
    },
    error: (error) => {
      this.loading.set(false);

      // Remove any old access.
      sessionStorage.removeItem('acquirerx_access_token');
      sessionStorage.removeItem('acquirerx_login_completed');

      this.info.set(error.error?.message || 'Invalid phone number or PIN.');
    },
  });
}

  generateOtp(): void {
  this.clearMessages();
  this.registerPhoneForm.markAllAsTouched();

  if (this.registerPhoneForm.invalid) {
    return;
  }

  const phone = this.registerPhoneForm.controls.phone.value ?? '';

  this.loading.set(true);

  this.authService.sendOtp(phone).subscribe({
    next: (response) => {
      this.loading.set(false);
      this.registerStep.set('otp');

      // During development backend may return devOtp.
      // Remove devOtp usage after real SMS provider is added.
      const devMessage = response.devOtp
        ? `${response.message} Dev OTP: ${response.devOtp}`
        : response.message;

      this.info.set(devMessage);
    },
    error: (error) => {
      this.loading.set(false);
      this.info.set(error.error?.message || 'Unable to send OTP.');
    },
  });
}

  verifyOtp(): void {
  this.clearMessages();
  this.otpForm.markAllAsTouched();

  if (this.otpForm.invalid) {
    return;
  }

  const phone = this.registerPhoneForm.controls.phone.value ?? '';
  const otp = this.otpForm.controls.otp.value ?? '';

  this.loading.set(true);

  this.authService.verifyOtp(phone, otp).subscribe({
    next: (response) => {
      this.loading.set(false);
      this.registrationToken.set(response.registrationToken);
      this.registerStep.set('pin');
      this.info.set(response.message);
    },
    error: (error) => {
      this.loading.set(false);
      this.info.set(error.error?.message || 'Invalid OTP.');
    },
  });
}


  resendOtp(): void {
  this.clearMessages();

  const phone = this.registerPhoneForm.controls.phone.value ?? '';

  if (!phone) {
    this.info.set('Please enter phone number first.');
    return;
  }

  this.loading.set(true);

  this.authService.sendOtp(phone).subscribe({
    next: (response) => {
      this.loading.set(false);

      const devMessage = response.devOtp
        ? `${response.message} Dev OTP: ${response.devOtp}`
        : response.message;

      this.info.set(devMessage);
    },
    error: (error) => {
      this.loading.set(false);
      this.info.set(error.error?.message || 'Unable to resend OTP.');
    },
  });
}

  completeRegistration(): void {
  this.clearMessages();
  this.pinForm.markAllAsTouched();

  if (this.pinForm.invalid) {
    return;
  }

  const phone = this.registerPhoneForm.controls.phone.value ?? '';
  const pin = this.pinForm.controls.pin.value ?? '';
  const confirmPin = this.pinForm.controls.confirmPin.value ?? '';
  const registrationToken = this.registrationToken();

  if (!registrationToken) {
    this.info.set('Please verify OTP first.');
    return;
  }

  this.loading.set(true);

  this.authService
    .registerPin(phone, pin, confirmPin, registrationToken)
    .subscribe({
      next: () => {
        this.loading.set(false);

        // Token is saved inside AuthService.
        this.router.navigate(['/sms']);
      },
      error: (error) => {
        this.loading.set(false);

        sessionStorage.removeItem('acquirerx_access_token');
        sessionStorage.removeItem('acquirerx_login_completed');

        this.info.set(error.error?.message || 'Registration failed.');
      },
    });
}
  handleBack(): void {
    this.clearMessages();

    if (this.authMode() !== 'register') {
      return;
    }

    if (this.registerStep() === 'otp') {
      this.registerStep.set('phone');
      return;
    }

    if (this.registerStep() === 'pin') {
      this.registerStep.set('otp');
      return;
    }

    this.switchToLogin();
  }

  togglePin(): void {
    this.showPin.update((value) => !value);
  }

  toggleConfirmPin(): void {
    this.showConfirmPin.update((value) => !value);
  }

  cleanNumberInput(
    controlName: string,
    formName: 'login' | 'registerPhone' | 'otp' | 'pin'
  ): void {
    let control: AbstractControl | null = null;

    if (formName === 'login') {
      control = this.loginForm.get(controlName);
    }

    if (formName === 'registerPhone') {
      control = this.registerPhoneForm.get(controlName);
    }

    if (formName === 'otp') {
      control = this.otpForm.get(controlName);
    }

    if (formName === 'pin') {
      control = this.pinForm.get(controlName);
    }

    if (!control) {
      return;
    }

    const cleanedValue = String(control.value ?? '').replace(/\D/g, '');
    control.setValue(cleanedValue, { emitEvent: false });
  }

  getPhoneError(control: AbstractControl | null): string {
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return this.pageData.validations.phoneRequired;
    }

    if (control.errors['pattern']) {
      return this.pageData.validations.phoneInvalid;
    }

    return '';
  }

  getOtpError(control: AbstractControl | null): string {
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return this.pageData.validations.otpRequired;
    }

    if (control.errors['pattern']) {
      return this.pageData.validations.otpInvalid;
    }

    return '';
  }

  getPinError(control: AbstractControl | null): string {
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return this.pageData.validations.pinRequired;
    }

    if (control.errors['pattern']) {
      return this.pageData.validations.pinInvalid;
    }

    return '';
  }

  getConfirmPinError(): string {
    const confirmPinControl = this.pinForm.get('confirmPin');

    if (!confirmPinControl || !confirmPinControl.touched) {
      return '';
    }

    if (confirmPinControl.errors?.['required']) {
      return this.pageData.validations.confirmPinRequired;
    }

    if (this.pinForm.errors?.['confirmPinMismatch']) {
      return this.pageData.validations.confirmPinMismatch;
    }

    return '';
  }

  highlightParts(text: string, highlightedWords: string[]): { text: string; highlighted: boolean }[] {
    if (!highlightedWords.length) {
      return [{ text, highlighted: false }];
    }

    const escapedWords = highlightedWords.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');

    return text
      .split(regex)
      .filter(Boolean)
      .map((part) => ({
        text: part,
        highlighted: highlightedWords.some(
          (word) => word.toLowerCase() === part.toLowerCase()
        ),
      }));
  }

  private confirmPinValidator(control: AbstractControl): ValidationErrors | null {
    const pin = control.get('pin')?.value;
    const confirmPin = control.get('confirmPin')?.value;

    if (!pin || !confirmPin) {
      return null;
    }

    return pin === confirmPin ? null : { confirmPinMismatch: true };
  }

  private runLoading(callback: () => void): void {
    this.loading.set(true);

    window.setTimeout(() => {
      callback();
      this.loading.set(false);
    }, 800);
  }

  private clearMessages(): void {
    this.info.set('');
  }

  private clearRegisterFields(): void {
    this.registerPhoneForm.reset();
    this.otpForm.reset();
    this.pinForm.reset();
    this.showPin.set(false);
    this.showConfirmPin.set(false);
  }

  private clearAllForms(): void {
    this.loginForm.reset();
    this.registerPhoneForm.reset();
    this.otpForm.reset();
    this.pinForm.reset();
    this.showPin.set(false);
    this.showConfirmPin.set(false);
    this.loading.set(false);
  }
}
