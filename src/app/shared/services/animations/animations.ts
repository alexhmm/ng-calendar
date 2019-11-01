import {
  trigger,
  style,
  transition,
  animate,
  group,
  query,
  animateChild
} from '@angular/animations';

export const fade = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('100ms ease-in-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('100ms ease-in-out', style({ opacity: 0 }))
  ])
]);

export const zoom = trigger('zoom', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate('100ms ease-in-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate(
      '100ms ease-in-out',
      style({ opacity: 0, transform: 'scale(0.95)' })
    )
  ])
]);

export const slideBottomToTop = trigger('slideBottomToTop', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate(
      '100ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0)' }),
    animate(
      '100ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(16px)' })
    )
  ])
]);

export const slideRight = trigger('slideRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-25%)' }),
    animate(
      '150ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0)' }),
    animate(
      '150ms ease-in-out',
      style({ opacity: 0, transform: 'translateX(25%)' })
    )
  ])
]);

export const slideLeft = trigger('slideLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(25%)' }),
    animate(
      '150ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0)' }),
    animate(
      '150ms ease-in-out',
      style({ opacity: 0, transform: 'translateX(-25%)' })
    )
  ])
]);

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
