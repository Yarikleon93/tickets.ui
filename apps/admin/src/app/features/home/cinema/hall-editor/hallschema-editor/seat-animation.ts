import { animate, state, style, transition, trigger } from '@angular/animations';

export const seatAnimation = trigger('toogle', [
  state('on', style({
    transform: 'scaleX(1)'
  })),
  state('off', style({
    transform: 'scaleX(1)'
  })),
  transition('on <=> off', [
    animate('0.1s ease-out', style({ transform: 'scaleX(0)' })),
    style({ transform: 'scaleX(1)' }),
  ]),
]);
