import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { TokenService } from '@app/sign-in';
import { routeAnimations } from '@app/ui/components/ui-elements';
import { TranslateService } from '@ngx-translate/core';
import { SidebarService } from 'libs/ui/components/ui-elements/src/lib/sidebar/sidebar.service';
import { Languages } from './core/models/enums/languages.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements AfterViewInit {
  title = 'TICKETS-UI';

  constructor(
    public sidebarService: SidebarService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private tokenService: TokenService,
  ) {
    translate.addLangs([Languages.RU]);
    translate.setDefaultLang(Languages.RU);
    translate.use(translate.getBrowserLang());
  }

  ngAfterViewInit(): void {
    const loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }

  public getAnimationData(outlet: RouterOutlet): RouterOutlet | Data | string {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['state'];
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
