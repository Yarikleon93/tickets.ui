import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BonuseService } from './bonuse.service';

@NgModule({
  imports: [CommonModule],
})
export class BonuseModule {
  static forRoot(): ModuleWithProviders<BonuseModule> {
    return {
      ngModule: BonuseModule,
      providers: [
        BonuseService,
      ]
    };
  }
}
