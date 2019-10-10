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
   * TEST: Returns fake appointments
   */
  getAppointments(): { appointments: any[] } {
    return {
      appointments: [
        {
          id: 'isu12',
          dateStart: new Date('October 10, 2019 09:00:00').toISOString(),
          dateEnd: new Date('October 10, 2019 09:30:00').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title: 'Besprechnung'
        },
        {
          id: '1241f',
          dateStart: new Date('October 17, 2019 09:00:00').toISOString(),
          dateEnd: new Date('October 17, 2019 10:45:00').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title: 'Besprechnung'
        },
        {
          id: 'fsfqf',
          dateStart: new Date('October 19, 2019 10:30:00').toISOString(),
          dateEnd: new Date('October 20, 2019 11:00:00').toISOString(),
          desc: 'Grooming Frooming Fäncy Begroooofe',
          place: 'Alfresco Büro',
          title: 'Grooming'
        },
        {
          id: '1t512',
          dateStart: new Date('November 25, 2019 11:00:00').toISOString(),
          dateEnd: new Date('November 25, 2019 11:30:00').toISOString(),
          desc: 'Alfreso Review',
          place: 'Alfresco Office English Baygriff',
          title: 'Review'
        }
      ]
    };
  }

  /**
   * Returns active month days with appointments
   * @param appointments All appointments
   * @param activeYear Actiive year
   * @param activeMonth Active month
   */
  getActiveAppointments(appointments, activeYear, activeMonth): any[] {
    const activeAppointments = [];
    for (const appointment of appointments) {
      if (
        moment(appointment.dateStart).year() === activeYear &&
        moment(appointment.dateStart).month() === activeMonth
      ) {
        activeAppointments.push({
          id: appointment.id,
          day: moment(appointment.dateStart).date(),
          month: moment(appointment.date).month(),
          year: moment(appointment.date).year(),
          desc: appointment.desc,
          place: appointment.place,
          title: appointment.title
        });
      }
    }
    return activeAppointments;
  }

  /**
   * Returns active month day numbers with appointments
   * @param appointments All appointments
   * @param activeYear Actiive year
   * @param activeMonth Active month
   */
  getActiveAppointmentDays(appointments, activeYear, activeMonth): number[] {
    const activeAppointmentDays: number[] = [];
    for (const appointment of appointments) {
      if (
        moment(appointment.dateStart).year() === activeYear &&
        moment(appointment.dateStart).month() === activeMonth
      ) {
        activeAppointmentDays.push(moment(appointment.dateStart).date());
      }
    }
    return activeAppointmentDays;
  }

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
   * Returns month name
   * @param month Month number
   */
  getMonthText(month: number): string {
    switch (month) {
      case 0:
        return 'Januar';
      case 1:
        return 'Februar';
      case 2:
        return 'März';
      case 3:
        return 'April';
      case 4:
        return 'Mai';
      case 5:
        return 'Juni';
      case 6:
        return 'Juli';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'Oktober';
      case 10:
        return 'November';
      case 11:
        return 'Dezember';
      default:
        return '';
    }
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
}
