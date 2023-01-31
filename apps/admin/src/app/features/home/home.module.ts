import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { MoviesModule } from './movies/movies.module';
import { RulesComponent } from './rules/rules.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TicketsComponent } from './tickets/tickets.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MoviesModule,
    UiElementsModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    RulesComponent,
    LandingpageComponent,
    ContactsComponent,
    TicketsComponent
  ]
})
export class HomeModule { }
