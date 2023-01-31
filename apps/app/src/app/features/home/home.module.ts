import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../shared/shared.module';
import { AdsBoardComponent } from './ads-board/ads-board.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { BreakingNewsComponent } from './breaking-news/breaking-news.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TopMovieComponent } from './top-movie/top-movie.component';


@NgModule({
  declarations: [
    HomeComponent,
    TopMovieComponent,
    AdsBoardComponent,
    AdsListComponent,
    BreakingNewsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    TranslateModule.forChild(),
    UiElementsModule
  ]
})
export class HomeModule { }
