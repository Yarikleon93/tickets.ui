import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizedDatePipe } from '@app/common';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { MovieEditorComponent } from './movie-editor/movie-editor.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { PosterComponent } from './poster/poster.component';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    UiElementsModule,
    FormsModule,
  ],
  declarations: [MoviesComponent, MovieEditorComponent, PosterComponent, LocalizedDatePipe],
  exports: [LocalizedDatePipe],
  providers: [LocalizedDatePipe],
})
export class MoviesModule { }
