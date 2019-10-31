import {
  trigger,
  style,
  transition,
  animate,
  group,
  query,
  animateChild
} from '@angular/animations';

export const modalEnter = trigger('modalEnter', [
  transition('* <=> *', [
    group([
      query('@modalEnterBackground', [animateChild()]),
      query('@modalEnterContent', [animateChild()])
    ])
  ])
]);

export const modalEnterBackground = trigger('modalEnterBackground', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in-out', style({ opacity: 1 }))
  ]),
  transition('true => false', [
    style({ opacity: 1 }),
    animate('210ms ease-in-out', style({ opacity: 0 }))
  ])
]);

export const modalEnterContent = trigger('modalEnterContent', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-16px)' }),
    animate(
      '200ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    )
  ]),
  transition('true => false', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate(
      '210ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(16px)' })
    )
  ])
]);
