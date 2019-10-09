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
   * Returns first day of month
   * @param monthDiff Difference from current month
   */
  getMonthStart(monthDiff: number): number {
    return moment()
      .add(monthDiff, 'months')
      .startOf('month')
      .day();
  }

  /**
   * Returns day array with calculated start
   * @param monthDiff Difference from current month
   */
  getDays(monthDiff: number): boolean[] {
    const days: boolean[] = [];
    let length: number;
    let start: number;
    if (monthDiff !== 0) {
      // Calculate days and start of any month
      length = moment()
        .add(monthDiff, 'months')
        .daysInMonth();
      start = moment()
        .add(monthDiff, 'months')
        .startOf('month')
        .day();
    } else {
      // Calculate days and start of current month
      length = moment().daysInMonth();
      start = moment()
        .startOf('month')
        .day();
    }
    // Set monday as first calendar day
    if (start > 0 && start < 6) {
      start = start - 1;
    } else {
      start = 6;
    }
    // Push days from last month
    for (let i = 0; i < start; i++) {
      days.push(false);
    }
    // Push all true days
    for (let i = start; i < start + length; i++) {
      days.push(true);
    }
    return days;
  }
}
