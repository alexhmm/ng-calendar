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

export const modalEnterBackground = trigger('modalEnterBackground', [
  state('false', style({ opacity: 0 })),
  state('true', style({ opacity: 1 })),
  transition('false => true', animate('200ms ease-in-out')),
  transition('true => false', animate('200ms ease-in-out'))
]);

export const modalEnterContent = trigger('modalEnterContent', [
  state('false', style({ opacity: 0, transform: 'translateY(-16px)' })),
  state('true', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('false => true', animate('200ms ease-in-out')),
  transition('true => false', animate('200ms ease-in-out'))
]);

export const modalEnterContent2 = trigger('modalEnterContent2', [
  state('hideStart', style({ opacity: 0, transform: 'translateY(-16px)' })),
  state('show', style({ opacity: 1, transform: 'translateY(0)' })),
  state('hideEnd', style({ opacity: 0, transform: 'translateY(16px)' })),
  transition('* <=> *', animate('200ms ease-in-out'))
]);
