import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsModule } from '@app/news';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsRoutingModule } from './news-routing.module';


@NgModule({
  declarations: [NewsListComponent, NewsDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    NewsRoutingModule,
    NewsModule,
    TranslateModule.forChild(),
    UiElementsModule
  ]
})
export class NewsPageModule { }
