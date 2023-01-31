import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { NewsComponent } from './news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    data: { state: 'newslist' }
  },
  {
    path: 'editor',
    component: NewsEditorComponent,
    data: { state: 'editor' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule { }
