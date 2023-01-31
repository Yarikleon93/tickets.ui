import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormManager } from '@app/form-manager';
import { TokenService, UserService } from '@app/sign-in';
import { KinoFormValidators } from '@app/utils';
import { TranslateService } from '@ngx-translate/core';
import { isEqual, omit } from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { UserFormValue } from '../../../core/models/user-form-value';
import { User } from './../../../core/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public form = this.fb.group({
    fullName: ['', [Validators.required, KinoFormValidators.patterns.fullName]],
    email: ['', [Validators.required, KinoFormValidators.patterns.email]],
    birthday: ['', [Validators.required, KinoFormValidators.isIncorrectDate]],
  });
  public readonly formManager = new FormManager(this.form);
  public userFormData: UserFormValue;
  public isOnHoverBirthday = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.tokenService.userId)
      .subscribe((user: User) => {
        this.setUserFormData(user);
      });
  }

  onSubmit(): void {
    if (!this.isFormChanged()) {
      return;
    }
    this.userService.updateUser(this.form.value).subscribe(() => {
      this.userFormData = { ...this.form.value };
      this.toastrService.success(
        ' ',
        this.translateService.instant('PROFILE.SETTINGS.CHANGES_SAVED')
      );
    });
  }

  private setUserFormData(user: User): void {
    this.userFormData = omit(user, ['role']);
    if (!this.userFormData.birthday) {
      this.userFormData = omit(this.userFormData, ['birthday']);
    }
    else {
      this.userFormData.birthday = moment(this.userFormData.birthday).format('YYYY-MM-DD');
    }
    this.form.patchValue(this.userFormData);
  }

  private isFormChanged(): boolean {
    return !isEqual(this.userFormData, this.form.value);
  }

}
