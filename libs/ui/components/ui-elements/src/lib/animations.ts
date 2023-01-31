import { animate, style, transition, trigger } from '@angular/animations';


export const routeAnimations =
  trigger('routeAnimation', [
    transition('home => right', [
      style({ opacity: 0, transform: 'translateY(20%)' }),
      animate('250ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition('left => right', [
      style({ opacity: 0, transform: 'translateX(5%)' }),
      animate('250ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition('right => left', [
      style({ opacity: 0, transform: 'translateX(-5%)' }),
      animate('250ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition('* <=> *', [
      style({ opacity: 0, transform: 'translateY(-32px)' }),
      animate('400ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),

  ]);
