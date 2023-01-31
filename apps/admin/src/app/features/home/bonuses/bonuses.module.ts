import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiElementsModule } from '@app/ui/components/ui-elements';
import { TranslateModule } from '@ngx-translate/core';
import { BonuseItemComponent } from './bonuse-item/bonuse-item.component';
import { BonusesRoutingModule } from './bonuses-routing.module';
import { BonusesComponent } from './bonuses.component';

@NgModule({
  imports: [
    CommonModule,
    BonusesRoutingModule,
    TranslateModule.forChild(),
    UiElementsModule,
    ReactiveFormsModule,
  ],
  declarations: [BonusesComponent, BonuseItemComponent]
})
export class BonusesModule { }
