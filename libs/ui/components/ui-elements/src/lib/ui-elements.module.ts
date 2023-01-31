import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { CircularLoaderComponent } from './circular-loader/circular-loader.component';
import { InputComponent } from './input/input.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputComponent,
    BurgerMenuComponent,
    SidebarComponent,
    CircularLoaderComponent,
    ModalWindowComponent
  ],
  exports: [
    InputComponent,
    BurgerMenuComponent,
    SidebarComponent,
    CircularLoaderComponent,
    ModalWindowComponent
  ]
})

export class UiElementsModule {
  static forRoot(sidebarServiceFactory = () => SidebarService): ModuleWithProviders {
    return {
      ngModule: UiElementsModule,
      providers: [
        SidebarComponent,
      ]
    };
  }
}
