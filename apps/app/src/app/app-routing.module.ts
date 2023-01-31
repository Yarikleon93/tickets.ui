import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactsComponent } from './shared/components/static/contacts/contacts.component';
import { NotFoundComponent } from './shared/components/static/not-found/not-found.component';
import { RulesComponent } from './shared/components/static/rules/rules.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.module').then(
            (module) => module.AuthModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.module').then(
            (module) => module.HomeModule
          ),
      },
      {
        path: 'movies',
        loadChildren: () =>
          import('./features/movie/movie.module').then(
            (module) => module.MovieModule
          ),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./features/news/news.module').then(
            (module) => module.NewsPageModule
          ),

      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/user-profile/user-profile.module').then(
            (module) => module.UserProfileModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'rules',
        component: RulesComponent,
        data: { state: 'rules' }
      },
      {
        path: 'contacts',
        component: ContactsComponent,
        data: { state: 'contacts' }
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent,
        data: { state: 'notfound' }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
