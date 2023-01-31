import { Component, OnInit } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { TokenService } from '@app/sign-in';
import { routeAnimations, SidebarService } from '@app/ui/components/ui-elements';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimations],
})
export class HomeComponent implements OnInit {

  constructor(public sidebarService: SidebarService, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  public getAnimationData(outlet: RouterOutlet): RouterOutlet | Data | string {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['state'];
  }

  public logout(): void {
    this.tokenService.removeToken();
  }
}
