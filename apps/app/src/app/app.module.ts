import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BonuseModule } from '@app/bonuse';
import { MovieModule } from '@app/movie';
import { CurrentUserService, UiComponentsSignInModule } from '@app/sign-in';
import { UiComponentsFooterModule } from '@app/ui/components/footer';
import { UiComponentsHeaderModule } from '@app/ui/components/header';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MovieModule.forRoot(),
    UiComponentsSignInModule.forRoot(),
    BonuseModule.forRoot(),
    BrowserAnimationsModule,
    UiComponentsHeaderModule,
    UiComponentsFooterModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    UiElementsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 2000,
    }),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (currentUserService: CurrentUserService) => () => currentUserService.getUser().subscribe(),
    deps: [CurrentUserService],
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
