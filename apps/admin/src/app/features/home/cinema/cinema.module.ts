import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HallModule } from '@app/hall';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../../shared/shared.module';
import { CinemaRoutingModule } from './cinema-routing.module';
import { CinemaComponent } from './cinema.component';
import { HallEditorComponent } from './hall-editor/hall-editor.component';
import { HallschemaEditorComponent } from './hall-editor/hallschema-editor/hallschema-editor.component';
import { SectorsFormComponent } from './hall-editor/sectors-form/sectors-form.component';
import { StructureFormComponent } from './hall-editor/structure-form/structure-form.component';

@NgModule({
  imports: [
    CommonModule,
    CinemaRoutingModule,
    TranslateModule.forChild(),
    UiElementsModule,
    ReactiveFormsModule,
    FormsModule,
    HallModule,
    SharedModule
  ],
  declarations: [
    CinemaComponent,
    HallEditorComponent,
    HallschemaEditorComponent,
    StructureFormComponent,
    SectorsFormComponent
  ]
})
export class CinemaModule { }
