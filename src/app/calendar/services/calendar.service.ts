import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  events = of({
    events: [
      {
        dateStart: new Date(),
        dateEnd: new Date(),
        title: 'Besprechnung mit Urs',
        description: 'Wirklich wichtig',
        priority: 3
      }
    ]
  });
  constructor() {}

  /**
   * Returns current month
   */
  getCurrentMonth(): number {
    return moment().month();
  }

  /**
   * Returns current year
   */
  getCurrentYear(): number {
    return moment().year();
  }

  /**
   * Returns year month data
   * @param monthDiff Difference from current month
   */
  getYearMonth(monthDiff: number): { year: number; month: number } {
    return {
      year: moment()
        .add(monthDiff, 'months')
        .year(),
      month: moment()
        .add(monthDiff, 'months')
        .month()
    };
  }

  /**
   * Returns days of month
   * @param monthDiff Difference from current month
   */
  getMonthLength(monthDiff: number): number {
    return moment()
      .add(monthDiff, 'months')
      .daysInMonth();
  }

  /**
   * Returns first day of month
   * @param monthDiff Difference from current month
   */
  getMonthStart(monthDiff: number): number {
    let start = moment()
      .add(monthDiff, 'months')
      .startOf('month')
      .day();
    // Set monday as first calendar day
    if (start > 0 && start < 6) {
      start = start - 1;
    } else {
      start = 6;
    }
    return start;
  }

  /**
   * Returns selected month days for view
   * @param monthDiff Difference from current month
   */
  getSelectedMonthDays(monthDiff: number): number[] {
    const selectedMonthLength = this.getMonthLength(monthDiff);
    const selectedMonthDays: number[] = [];
    for (let i = 0; i < selectedMonthLength; i++) {
      selectedMonthDays.push(i + 1);
    }
    return selectedMonthDays;
  }

  /**
   * Returns next month days for view
   * @param monthDiff Difference from current month
   */
  getNextMonthDays(monthDiff: number): number[] {
    const monthLength = this.getMonthLength(monthDiff);
    const monthStart = this.getMonthStart(monthDiff);
    const nextMonthLengthView = 42 - monthLength - monthStart;
    const nextMonthDays: number[] = [];
    for (let i = 0; i < nextMonthLengthView; i++) {
      nextMonthDays.push(i + 1);
    }
    return nextMonthDays;
  }

  /**
   * Returns previous month days for view
   * @param monthDiff Difference from current month
   */
  getPrevMonthDays(monthDiff: number): number[] {
    const prevMonthLength = this.getMonthLength(monthDiff - 1);
    const monthStart = this.getMonthStart(monthDiff);
    const prevMonthDays: number[] = [];
    for (let i = 0; i < monthStart; i++) {
      prevMonthDays.push(prevMonthLength - monthStart + i + 1);
    }
    return prevMonthDays;
  }
}
