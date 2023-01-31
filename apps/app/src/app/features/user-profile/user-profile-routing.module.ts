import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonusesComponent } from './bonuses/bonuses.component';
import { SettingsComponent } from './settings/settings.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'tickets',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { state: 'settings' }
      },
      {
        path: 'bonuses',
        component: BonusesComponent,
      },
      {
        path: 'tickets',
        component: TicketsComponent,
        data: { state: 'tickets' }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
