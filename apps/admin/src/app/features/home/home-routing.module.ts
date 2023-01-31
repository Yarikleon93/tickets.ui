import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RulesComponent } from './rules/rules.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'movies',
        loadChildren: () =>
          import('./movies/movies.module').then(
            (module) => module.MoviesModule
          ),
      },
      {
        path: 'cinema',
        loadChildren: () =>
          import('./cinema/cinema.module').then(
            (module) => module.CinemaModule
          ),
      },
      {
        path: 'tickets',
        component: TicketsComponent,
        data: { state: 'tickets' }
      },
      {
        path: 'landingpage',
        component: LandingpageComponent,
        data: { state: 'homepage' }
      },
      {
        path: 'bonuses',
        loadChildren: () =>
          import('./bonuses/bonuses.module').then(
            (module) => module.BonusesModule
          ),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./news/news.module').then(
            (module) => module.NewsPageModule
          ),
      },
      {
        path: 'contacts',
        component: ContactsComponent,
        data: { state: 'contacts' }
      },
      {
        path: 'rules',
        component: RulesComponent,
        data: { state: 'rules' }
      },
      {
        path: '',
        redirectTo: 'movies'
      },
      {
        path: '**',
        redirectTo: 'movies'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
