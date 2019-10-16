import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

import { Appointment } from '../models/appointment';
import { AppointmentView } from '../models/appointment-view';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  activeMonthSrc = new BehaviorSubject(0);
  activeMonth = this.activeMonthSrc.asObservable();

  constructor() {}

  /**
   * TEST: Returns fake appointments
   */
  getAppointments(): { appointments: Appointment[] } {
    return {
      appointments: [
        {
          id: 'isu11',
          dateStart: new Date('December 2, 2018 09:00:00').toISOString(),
          dateEnd: new Date('December 2, 2018 09:30:00').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title: 'Besprechnung'
        },
        {
          id: 'isu12',
          dateStart: new Date('October 15, 2019 09:00:00').toISOString(),
          dateEnd: new Date('October 15, 2019 09:30:00').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title:
            'Besprechnung. Text muss gekürzt werden. Auch in ganz großen Auflösungen.'
        },
        {
          id: '1241u',
          dateStart: new Date('October 15, 2019 11:00:00').toISOString(),
          dateEnd: new Date('October 15, 2019 12:45:00').toISOString(),
          desc: 'Tische in den Keller bringen.',
          place: 'Haus',
          title: 'Aufräumen'
        },
        {
          id: '1241f',
          dateStart: new Date('October 16, 2019 08:00:00').toISOString(),
          dateEnd: new Date('October 16, 2019 9:00:00').toISOString(),
          desc: 'Vorgespräch',
          place: 'Konferenzraum oben',
          title: 'Termin'
        },
        {
          id: '1241g',
          dateStart: new Date('October 16, 2019 09:00:00').toISOString(),
          dateEnd: new Date('October 16, 2019 10:45:00').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title: 'Besprechnung'
        },
        {
          id: '1241u',
          dateStart: new Date('October 16, 2019 11:00:00').toISOString(),
          dateEnd: new Date('October 16, 2019 12:45:00').toISOString(),
          desc: 'Planning Sprint',
          place: 'Neuer Konfi',
          title: 'Planning'
        },
        {
          id: '12482',
          dateStart: new Date('October 16, 2019 13:00:00').toISOString(),
          dateEnd: new Date('October 16, 2019 15:45:00').toISOString(),
          desc: 'Nachbesprechnung',
          place: 'Alfresco Office',
          title: 'Review Grooming'
        },
        {
          id: '1241g',
          dateStart: new Date('October 16, 2019 09:00:00').toISOString(),
          dateEnd: new Date('October 16, 2019 10:45:00').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title: 'Besprechnung'
        },
        {
          id: '1241u',
          dateStart: new Date('October 16, 2019 11:00:00').toISOString(),
          dateEnd: new Date('October 16, 2019 12:45:00').toISOString(),
          desc: 'Planning Sprint',
          place: 'Neuer Konfi',
          title: 'Planning'
        },
        {
          id: '12482',
          dateStart: new Date('October 16, 2019 13:00:00').toISOString(),
          dateEnd: new Date('October 16, 2019 15:45:00').toISOString(),
          desc: 'Nachbesprechnung',
          place: 'Alfresco Office',
          title: 'Review Grooming'
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
          id: '121lf',
          dateStart: new Date('October 24, 2019 09:00:00').toISOString(),
          dateEnd: new Date('October 24, 2019 09:30:00').toISOString(),
          desc: 'Wichtiger Termin',
          place: 'Konferenzraum unten',
          title: 'Termin'
        },
        {
          id: '1t512',
          dateStart: new Date('November 11, 2019 11:00:00').toISOString(),
          dateEnd: new Date('November 11, 2019 11:30:00').toISOString(),
          desc: 'Alfreso Review',
          place: 'Alfresco Office English Baygriff',
          title: 'Review'
        }
      ]
    };
  }

  /**
   * Returns one appointment by id
   * @param id Appointment id
   */
  getAppointmentById(id: string): Appointment {
    const appointments: {
      appointments: Appointment[];
    } = this.getAppointments();
    return appointments.appointments.find(appointment => appointment.id === id);
  }

  /**
   * Returns active month days with appointments
   * @param appointments All appointments
   * @param activeYear Actiive year
   * @param activeMonth Active month
   */
  getActiveAppointments(
    appointments,
    activeYear,
    activeMonth
  ): AppointmentView[] {
    const activeAppointments = [];
    for (const appointment of appointments) {
      if (
        moment(appointment.dateStart).year() === activeYear &&
        moment(appointment.dateStart).month() === activeMonth
      ) {
        activeAppointments.push({
          id: appointment.id,
          dateStart: appointment.dateStart,
          dateEnd: appointment.dateEnd,
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
        const date = moment(appointment.dateStart).date();
        if (activeAppointmentDays.indexOf(date) < 0) {
          activeAppointmentDays.push(date);
        }
      }
    }
    return activeAppointmentDays;
  }

  /**
   * Returns Active appointment titls for agenda preview
   * @param appointments Appointment list
   * @param activeYear Active year
   * @param activeMonth Active month
   */
  getActiveAppointmentPreviews(
    appointments: AppointmentView[],
    activeYear,
    activeMonth
  ): { day: number; appointments: string[] }[] {
    const activeAppointmentPreviews: {
      day: number;
      appointments: string[];
    }[] = [];
    for (const appointment of appointments) {
      if (
        moment(appointment.dateStart).year() === activeYear &&
        moment(appointment.dateStart).month() === activeMonth
      ) {
        // Check if day is already added to array

        if (
          activeAppointmentPreviews.findIndex(
            app => app.day === moment(appointment.dateStart).date()
          ) < 0
        ) {
          const apps = [];
          apps.push(appointment.title);
          activeAppointmentPreviews.push({
            day: moment(appointment.dateStart).date(),
            appointments: [...apps]
          });
          // Push another title into same day
        } else {
          const index = activeAppointmentPreviews.findIndex(
            app => app.day === moment(appointment.dateStart).date()
          );
          activeAppointmentPreviews[index].appointments.push(appointment.title);
        }
      }
    }
    return activeAppointmentPreviews;
  }

  getActiveDayAppointmentsByISOString(
    appointments: AppointmentView[],
    date: string
  ): AppointmentView[] {
    const activeDayAppointments = [];
    for (const appointment of appointments) {
      if (
        appointment.dateStart.includes(date) ||
        appointment.dateEnd.includes(date)
      ) {
        activeDayAppointments.push({
          id: appointment.id,
          dateStart: appointment.dateStart,
          dateEnd: appointment.dateEnd,
          // day: moment(appointment.dateStart).date(),
          // month: moment(appointment.dateStart).month(),
          // year: moment(appointment.dateStart).year(),
          desc: appointment.desc,
          place: appointment.place,
          title: appointment.title
        });
      }
    }
    return activeDayAppointments;
  }

  /**
   * Returns short day strings
   */
  getDayStrings(): string[] {
    return ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  }

  /**
   * Returns ISO string by given Date
   * @param year Year
   * @param month Month
   * @param day Day
   */
  getISOStringByDate(
    year: number,
    month: number | string,
    day: number | string
  ): string {
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return moment(year + '-' + month + '-' + day).toISOString(true);
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

  /**
   * Set active month
   * @param activeMonth Active month
   */
  setActiveMonth(activeMonth: number): void {
    this.activeMonthSrc.next(activeMonth);
  }
}
