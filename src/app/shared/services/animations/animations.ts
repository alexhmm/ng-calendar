import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  query,
  animateChild
} from '@angular/animations';

export const modalEnterContainer = trigger('modalEnterContainer', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('200ms ease-in-out', style({ opacity: 0 }))
  ])
]);

export const modalEnterContent = trigger('modalEnterContent', [
  // state('none', style({ opacity: 0, transform: 'translateY(-16px)' })),
  // state('selected', style({ opacity: 1, transform: 'translateY(0)' })),
  // transition('void => selected', animate('200ms ease-in')),
  // transition('selected => void', animate('200ms ease-out'))
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(-16px)' })
    )
  ])
]);
