import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HallSchemaComponent } from './components/hall-schema/hall-schema.component';
import { HallService } from './hall.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    HallSchemaComponent
  ],
  exports: [
    HallSchemaComponent
  ]
})
export class HallModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HallModule,
      providers: [
        HallService,
      ]
    };
  }

}
