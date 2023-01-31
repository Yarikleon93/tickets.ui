import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalizedDatePipe } from '@app/common';
import { HallModule } from '@app/hall';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { HallGridComponent } from './components/cinema/hall-grid/hall-grid.component';
import { OrderTicketsComponent } from './components/cinema/order-tickets/order-tickets.component';
import { MovieInfoComponent } from './components/movie/movie-info/movie-info.component';
import { MoviePosterComponent } from './components/movie/movie-poster/movie-poster.component';
import { DatePickerComponent } from './components/schedule/date-picker/date-picker.component';
import { SessionPickerComponent } from './components/schedule/session-picker/session-picker.component';
import { ContactsComponent } from './components/static/contacts/contacts.component';
import { NotFoundComponent } from './components/static/not-found/not-found.component';
import { RulesComponent } from './components/static/rules/rules.component';
import { CheckboxComponent } from './components/ui-elements/checkbox/checkbox.component';

@NgModule({
  declarations: [
    DatePickerComponent,
    SessionPickerComponent,
    CheckboxComponent,
    MovieInfoComponent,
    MoviePosterComponent,
    HallGridComponent,
    OrderTicketsComponent,
    LocalizedDatePipe,
    ContactsComponent,
    RulesComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    UiElementsModule,
    HallModule
  ],
  exports: [
    DatePickerComponent,
    SessionPickerComponent,
    CommonModule,
    CheckboxComponent,
    MoviePosterComponent,
    MovieInfoComponent,
    HallGridComponent,
    OrderTicketsComponent,
    LocalizedDatePipe,
    ContactsComponent,
    RulesComponent,
    NotFoundComponent,
  ],
  providers: [LocalizedDatePipe]
})
export class SharedModule { }
