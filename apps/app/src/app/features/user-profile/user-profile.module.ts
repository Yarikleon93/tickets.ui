import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../shared/shared.module';
import { BonuseCardComponent } from './bonuses/bonuse-card/bonuse-card.component';
import { BonusesComponent } from './bonuses/bonuses.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SettingsComponent } from './settings/settings.component';
import { NoTicketsComponent } from './tickets/no-tickets/no-tickets.component';
import { TicketCardListComponent } from './tickets/ticket-card-list/ticket-card-list.component';
import { TicketCardComponent } from './tickets/ticket-card/ticket-card.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';



@NgModule({
  declarations: [
    BonuseCardComponent,
    BonusesComponent,
    UserProfileComponent,
    NavigationComponent,
    SettingsComponent,
    TicketsComponent,
    TicketCardListComponent,
    TicketCardComponent,
    NoTicketsComponent
  ],
  imports: [
    UiElementsModule,
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserProfileModule { }
