import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor() {}

  /**
   * Returns current month number
   */
  getCurrentMonth(): number {
    return moment().month();
  }

  getMonthData(month: number): { length: number; start: number } {
    return {
      length: moment().daysInMonth(),
      start: moment()
        .startOf('month')
        .day()
    };
  }

  getDays(month: number): any[] {
    const days = [];
    const length = moment().daysInMonth();
    let start = moment()
      .startOf('month')
      .day();
    // If month start is on sunday, change index number
    if (start > 0 && start < 6) {
      start = start - 1;
    } else {
      start = 6;
    }
    // if (start === 0) {
    //   start = 7;
    // }
    console.log('start', start);
    for (let i = 0; i < start; i++) {
      days.push(false);
    }
    console.log('days before start', days.length, days);
    // Push all dates
    for (let i = start; i < start + length; i++) {
      days.push(true);
    }
    console.log('days after start', days.length, days);
    return days;
  }
}
