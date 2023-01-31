import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ImageService } from './image.service';

@NgModule({
  imports: [CommonModule],
})
export class CommonServiceModule {
  static forRoot(): ModuleWithProviders<CommonServiceModule> {
    return {
      ngModule: CommonServiceModule,
      providers: [
        ImageService,
      ]
    }
  }
}
