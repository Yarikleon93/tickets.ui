import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KinoFormValidators } from '@app/utils';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { FormManager } from './../../../../form-manager/src/lib/form-manager';

@Component({
  selector: 'app-auth-form',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public form = this.fb.group({
    email: ['', [Validators.required, KinoFormValidators.patterns.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  public readonly formManager = new FormManager(this.form);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.authService.login(this.form.value).subscribe(
      () => {
        this.toastrService.success(
          ' ',
          this.translateService.instant('NOTIFICATIONS.LOGIN_SUCCESS')
        );
      },
      (response) => {
        this.toastrService.error(
          response.error.message,
          this.translateService.instant('NOTIFICATIONS.LOGIN_FAIL')
        );
      }
    );
  }
}
