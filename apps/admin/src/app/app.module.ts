import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonServiceModule } from '@app/common';
import { MovieModule } from '@app/movie';
import { UiComponentsSignInModule } from '@app/sign-in';
import { UiComponentsFooterModule } from '@app/ui/components/footer';
import { UiComponentsHeaderModule } from '@app/ui/components/header';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiComponentsHeaderModule,
    UiComponentsFooterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
    UiElementsModule,
    UiComponentsSignInModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 2000,
    }),
    CommonServiceModule.forRoot(),
    MovieModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
