import { Component, OnInit } from '@angular/core';
import { BonuseService } from '@app/bonuse';
import { Bonuse } from '@app/models';
import { CurrentUserService } from '@app/sign-in';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.scss']
})
export class BonusesComponent implements OnInit {
  public bonuses: Bonuse[];
  public userBonuse = 0;
  constructor(
    private bonuseService: BonuseService,
    private currentUserService: CurrentUserService
    ) { }

  ngOnInit(): void {
    this.bonuseService.getBonuses().subscribe((bonuses) => {
      this.bonuses = bonuses;
    });
    this.userBonuse = this.currentUserService.user.bonuse;
  }

}
