import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormManager } from '@app/form-manager';
import { LoginData } from '@app/models';
import { AuthService } from '@app/sign-in';
import { KinoFormValidators } from '@app/utils';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public form = this.fb.group({
    email: ['', [Validators.required, KinoFormValidators.patterns.email]],
    passwords: this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            KinoFormValidators.patterns.password,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: KinoFormValidators.comparePasswords }
    ),
    isAccepted: ['', Validators.requiredTrue],
  });
  public readonly formManager = new FormManager(this.form);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  public onSubmit(): void {
    const registerData: LoginData = {
      email: this.form.get('email').value,
      password: this.form.get('passwords.password').value,
    };
    this.authService.register(registerData).subscribe(
      () => {
        this.router.navigate(['/auth/sign-in']);
        this.toastrService.success(
          ' ',
          this.translateService.instant('NOTIFICATIONS.REGISTRATION_SUCCESS')
        );
      },
      (response) => {
        this.toastrService.error(
          response.error.message,
          this.translateService.instant('NOTIFICATIONS.REGISTRATION_FAIL')
        );
      }
    );
  }
}
