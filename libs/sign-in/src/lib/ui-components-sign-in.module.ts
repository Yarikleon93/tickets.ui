import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { CurrentUserService } from './curren-user.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UiElementsModule,
    TranslateModule.forChild(),
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 2000,
    }),
  ],
  declarations: [
    SignInComponent,
],
  exports: [SignInComponent]
})
export class UiComponentsSignInModule {
  static forRoot(tokenServiceFactory = () => TokenService): ModuleWithProviders {
    return {
      ngModule: UiComponentsSignInModule,
      providers: [
        AuthService,
        TokenService,
        CookieService,
        UserService,
        CurrentUserService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        }
      ]
    };
  }
}
