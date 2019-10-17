import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Debounce for @HostListener event
 * https://stackoverflow.com/questions/44634992/debounce-hostlistener-event?rq=1
 * @param delay Delay
 */
export function debounce(delay: number = 300): MethodDecorator {
  // tslint:disable-next-line:only-arrow-functions
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let timeout = null;
    const original = descriptor.value;
    descriptor.value = function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => original.apply(this, args), delay);
    };
    return descriptor;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // Breakpoints
  readonly xs: number = 360;
  readonly sm: number = 576;
  readonly md: number = 768;
  readonly lg: number = 960;
  readonly xl: number = 1200;
  readonly fhd: number = 1920;

  innerHeight = window.innerHeight;
  innerWidth = window.innerWidth;
  ngUnsubscribe: Subject<object> = new Subject();
  screen: string;

  // Observables
  stateScreenSrc = new BehaviorSubject(null);
  stateScreen = this.stateScreenSrc.asObservable();
  stateHeightSrc = new BehaviorSubject(window.innerHeight);
  stateHeight = this.stateHeightSrc.asObservable();
  stateWidthSrc = new BehaviorSubject(window.innerWidth);
  stateWidth = this.stateWidthSrc.asObservable();

  constructor() {
    this.setScreenState();
  }

  /**
   * Returns number array by length
   * @param length Length
   */
  getNumberArray(length: number) {
    const numberArray: number[] = [];
    for (let i = 0; i < length; i++) {
      numberArray.push(i);
    }
    return numberArray;
  }

  /**
   * Sets screen state when window width changes
   */
  setScreenState() {
    this.stateWidth.pipe(takeUntil(this.ngUnsubscribe)).subscribe(width => {
      if (width < this.sm && this.screen !== 'xs') {
        this.screen = 'xs';
        this.stateScreenSrc.next('xs');
      } else if (
        width > this.sm - 1 &&
        width < this.md &&
        this.screen !== 'sm'
      ) {
        this.screen = 'sm';
        this.stateScreenSrc.next('sm');
      } else if (
        width > this.md - 1 &&
        width < this.lg &&
        this.screen !== 'md'
      ) {
        this.screen = 'md';
        this.stateScreenSrc.next('md');
      } else if (
        width > this.lg - 1 &&
        width < this.xl &&
        this.screen !== 'lg'
      ) {
        this.screen = 'lg';
        this.stateScreenSrc.next('lg');
      } else if (
        width > this.xl - 1 &&
        width < this.fhd &&
        this.screen !== 'xl'
      ) {
        this.screen = 'xl';
        this.stateScreenSrc.next('xl');
      } else if (width > this.fhd - 1 && this.screen !== 'fhd') {
        this.screen = 'fhd';
        this.stateScreenSrc.next('fhd');
      }
    });
  }

  /**
   * Sets screen height
   * @param width Screen height
   */
  setScreenHeight(height: number) {
    this.innerHeight = height;
    this.stateHeightSrc.next(height);
  }

  /**
   * Sets screen width
   * @param width Screen width
   */
  setScreenWidth(width: number) {
    this.innerWidth = width;
    this.stateWidthSrc.next(width);
  }
}
