import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { VideoPlayerComponent } from './movie-detail/video-player/video-player.component';
import { MovieRoutingModule } from './movie-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    MovieDetailComponent,
    ScheduleComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    YouTubePlayerModule,
    UiElementsModule
  ]
})
export class MovieModule { }
