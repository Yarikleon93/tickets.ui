import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';

export const appearance =
  trigger('appearance', [
    state('closed',
      style({ display: 'none', zIndex: 99 })
    ),
    transition('closed => opened', [
      style({ display: 'flex', transform: 'translateX(100%)', zIndex: 99 }),
      animate('300ms ease-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition('opened => closed', [
      style({ transform: 'translateX(0%)' }),
      animate('200ms linear', style({ opacity: 0, transform: 'translateX(100%)' }))
    ]),
  ]);

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [appearance]
})
export class SidebarComponent {

  constructor(public sidebarService: SidebarService) { }
}
