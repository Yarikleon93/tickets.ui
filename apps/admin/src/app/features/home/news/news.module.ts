import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsModule } from '@app/news';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    NewsModule,
    TranslateModule.forChild(),
    UiElementsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [NewsComponent, NewsEditorComponent]
})
export class NewsPageModule { }
