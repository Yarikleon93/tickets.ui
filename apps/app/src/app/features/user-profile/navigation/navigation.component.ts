import { Component, OnInit } from '@angular/core';
import { TokenService } from '@app/sign-in';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  out(): void {
    this.tokenService.removeToken();
  }

}
