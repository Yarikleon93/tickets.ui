import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaComponent } from './cinema.component';
import { HallEditorComponent } from './hall-editor/hall-editor.component';

const routes: Routes = [
  {
    path: '',
    component: CinemaComponent,
    data: { state: 'left' }
  },
  {
    path: 'editor',
    component: HallEditorComponent,
    data: { state: 'right' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaRoutingModule { }
