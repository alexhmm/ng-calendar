import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  monthDifferenceSrc = new BehaviorSubject(0);
  monthDifference = this.monthDifferenceSrc.asObservable();

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
          dateStart: new Date('October 17, 2019 13:00:00').toISOString(),
          dateEnd: new Date('October 17, 2019 15:45:00').toISOString(),
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
          dateStart: new Date('December 11, 2019 11:00:00').toISOString(),
          dateEnd: new Date('December 11, 2019 11:30:00').toISOString(),
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
  getActiveAppointments(activeYear, activeMonth): Appointment[] {
    const activeAppointments = [];
    for (const appointment of this.getAppointments().appointments) {
      if (
        moment(appointment.dateStart).year() === activeYear &&
        moment(appointment.dateStart).month() === activeMonth
      ) {
        activeAppointments.push({
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
    return activeAppointments;
  }

  /**
   * Returns appointment length of active day
   * @param activeAppointments Active appointments
   * @param activeDay Active Day
   * @param activeMonth Active month
   * @param activeYear Active year
   */
  getActiveDayAppointmentLength(
    activeAppointments: Appointment[],
    activeDay,
    activeMonth,
    activeYear
  ) {
    const date = this.getDateStringByNumbers(
      activeDay,
      activeMonth,
      activeYear
    );
    let length = 0;
    for (const activeAppointment of activeAppointments) {
      if (
        activeAppointment.dateStart.includes(date) ||
        activeAppointment.dateEnd.includes(date)
      ) {
        length++;
      }
    }
    return length;
  }

  /**
   * Returns first matched active appointment
   * @param activeAppointments Active appointments
   * @param activeDay Active day
   * @param activeMonth Active month
   * @param activeYear Active year
   */
  getActiveDayAppointmentTitle(
    activeAppointments: Appointment[],
    activeDay: number,
    activeMonth: number,
    activeYear: number
  ): string {
    // Find first appointment with matched date
    const date = activeAppointments.find(activeAppointment =>
      activeAppointment.dateStart.includes(
        this.getDateStringByNumbers(activeDay, activeMonth, activeYear)
      )
    );
    // Return first appointment title
    if (date) {
      return date.title;
    } else {
      return null;
    }
  }

  getActiveDayAppointmentsByDateString(date: string): Appointment[] {
    const appointments = this.getAppointments().appointments;
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
   * Returns calculated month by month difference
   * @param monthDifference Month difference
   */
  getActiveMonth(monthDifference: number) {
    return moment()
      .add(monthDifference, 'months')
      .month();
  }

  /**
   * Returns year by month difference number
   * @param monthDifference Month difference
   */
  getActiveYear(monthDifference: number): number {
    return moment()
      .add(monthDifference, 'months')
      .year();
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
   * Returns month difference by given ISO Date string
   * @param ISODate ISO Date string
   */
  getMonthDifference(ISODate: string): number {
    const aYear = moment(ISODate).year();
    const bYear = moment(new Date()).year();
    const aMonth = moment(ISODate).month() + 1;
    const bMonth = moment(new Date()).month() + 1;
    let difference: number;
    const yearDiff = aYear - bYear;
    const monthDiff = aMonth - bMonth;
    if (yearDiff < 0 || yearDiff > 0) {
      difference = yearDiff * 12 + monthDiff;
    } else {
      difference = monthDiff;
    }
    return difference;
  }

  /**
   * Returns date string by numbers
   * @param day Day
   * @param month Month
   * @param year Year
   */
  getDateStringByNumbers(day: number, month: number, year: number): string {
    let dayString: any = day;
    let monthString: any = month + 1;
    if (day < 10) {
      dayString = '0' + day;
    }
    if (monthString < 10) {
      monthString = '0' + monthString;
    }
    return year + '-' + monthString + '-' + dayString;
  }

  /**
   * Returns short day strings
   */
  getDayStrings(): string[] {
    return ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
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
   * Returns month length (days)
   * @param monthDifference Month difference
   */
  getMonthLength(monthDifference: number): number {
    return moment()
      .add(monthDifference, 'months')
      .daysInMonth();
  }

  /**
   * Returns first day of month
   * @param monthDifference Month difference
   */
  getMonthStart(monthDifference: number): number {
    let start = moment()
      .add(monthDifference, 'months')
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
   * Returns next month length for view
   * @param monthDifference Month difference
   */
  getNextMonthLength(monthDifference: number): number {
    return (
      42 -
      this.getMonthLength(monthDifference) -
      this.getPrevMonthLength(monthDifference)
    );
  }

  getPrevMonthDays(monthDifference: number): number[] {
    const days: number[] = [];
    const prevMonthFullLength = this.getMonthLength(monthDifference - 1);
    const prevMonthRestLength = this.getPrevMonthLength(monthDifference);
    for (let i = 0; i < prevMonthRestLength; i++) {
      days.push(prevMonthFullLength - prevMonthRestLength + i + 1);
    }
    return days;
  }

  /**
   * Returns previous month length for view
   * @param monthDifference Month difference
   */
  getPrevMonthLength(monthDifference: number): number {
    return (length = Math.abs(
      this.getMonthLength(monthDifference - 1) -
        (this.getMonthLength(monthDifference - 1) -
          this.getMonthStart(monthDifference))
    ));
  }

  /**
   * Returns selected month days for view
   * @param monthDifference Month Difference
   */
  getSelectedMonthDays(monthDifference: number): number[] {
    const selectedMonthLength = this.getMonthLength(monthDifference);
    const selectedMonthDays: number[] = [];
    for (let i = 0; i < selectedMonthLength; i++) {
      selectedMonthDays.push(i + 1);
    }
    return selectedMonthDays;
  }

  /**
   * Sets month difference number
   * @param monthDifference Month difference
   */
  setMonthDifference(monthDifference: number): void {
    this.monthDifferenceSrc.next(monthDifference);
  }
}
