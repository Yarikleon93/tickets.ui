import { Component } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { TokenService } from '@app/sign-in';
import { routeAnimations } from '@app/ui/components/ui-elements';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent {
  title = 'admin';
  constructor(
    private translate: TranslateService,
    private tokenService: TokenService,
  ) {
    translate.addLangs(['ru']);
    translate.setDefaultLang('ru');
    translate.use(translate.getBrowserLang());
  }

  public getAnimationData(outlet: RouterOutlet): RouterOutlet | Data | string {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['state'];
  }

  public logout(): void {
    this.tokenService.removeToken();
  }

  public get isLogin(): boolean {
    return !!this.tokenService.token;
  }
}
