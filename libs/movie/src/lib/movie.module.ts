import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MovieService } from './movie.service';

@NgModule({
  imports: [CommonModule],
})
export class MovieModule {
  static forRoot(): ModuleWithProviders<MovieModule> {
    return {
      ngModule: MovieModule,
      providers: [
        MovieService,
      ]
    };
  }
}
