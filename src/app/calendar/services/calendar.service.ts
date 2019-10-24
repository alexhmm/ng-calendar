import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  dateSrc = new BehaviorSubject(null);
  date = this.dateSrc.asObservable();
  hourSrc = new BehaviorSubject(null);
  hour = this.hourSrc.asObservable();
  minuteSrc = new BehaviorSubject(null);
  minute = this.minuteSrc.asObservable();
  monthDifferenceSrc = new BehaviorSubject(0);
  monthDifference = this.monthDifferenceSrc.asObservable();
  statePickerSrc = new BehaviorSubject('date');
  statePicker = this.statePickerSrc.asObservable();

  constructor() {}

  /**
   * TEST: Returns fake appointments
   */
  getAppointments(): { appointments: Appointment[] } {
    return {
      appointments: [
        {
          id: 'isu11',
          dateStart: moment('2018-12-02 09:00').toISOString(),
          dateEnd: moment('2018-12-02 09:30').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title: 'Besprechnung'
        },
        {
          id: 'isu12',
          dateStart: moment('2019-10-15 09:00').toISOString(),
          dateEnd: moment('2019-10-15 09:30').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title:
            'Besprechnung. Text muss gekürzt werden. Auch in ganz großen Auflösungen.'
        },
        {
          id: '1241u',
          dateStart: moment('2019-10-15 11:00').toISOString(),
          dateEnd: moment('2019-10-15 12:45').toISOString(),
          desc: 'Tische in den Keller bringen.',
          place: 'Haus',
          title: 'Aufräumen'
        },
        {
          id: '1241f',
          dateStart: moment('2019-10-16 08:00').toISOString(),
          dateEnd: moment('2019-10-16 09:00').toISOString(),
          desc: 'Vorgespräch',
          place: 'Konferenzraum oben',
          title: 'Termin'
        },
        {
          id: '1241g',
          dateStart: moment('2019-10-16 09:00').toISOString(),
          dateEnd: moment('2019-10-16 10:45').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title: 'Besprechnung'
        },
        {
          id: '1241u',
          dateStart: moment('2019-10-16 11:00').toISOString(),
          dateEnd: moment('2019-10-16 12:45').toISOString(),
          desc: 'Planning Sprint',
          place: 'Neuer Konfi',
          title: 'Planning'
        },
        {
          id: '12482',
          dateStart: moment('2019-10-16 13:00').toISOString(),
          dateEnd: moment('2019-10-16 15:45').toISOString(),
          desc: 'Nachbesprechnung',
          place: 'Alfresco Office',
          title: 'Review Grooming'
        },
        {
          id: '1241g',
          dateStart: moment('2019-10-16 09:00').toISOString(),
          dateEnd: moment('2019-10-16 10:45').toISOString(),
          desc: 'Im Konfi. Alle möglichen Dinge.',
          place: 'Konferenzraum unten',
          title: 'Besprechnung'
        },
        {
          id: '1241u',
          dateStart: moment('2019-10-16 11:00').toISOString(),
          dateEnd: moment('2019-10-16 12:45').toISOString(),
          desc: 'Planning Sprint',
          place: 'Neuer Konfi',
          title: 'Planning'
        },
        {
          id: '12482',
          dateStart: moment('2019-10-17 13:00').toISOString(),
          dateEnd: moment('2019-10-17 15:45').toISOString(),
          desc: 'Nachbesprechnung',
          place: 'Alfresco Office',
          title: 'Review Grooming'
        },
        {
          id: 'fsfqf',
          dateStart: moment('2019-10-19 10:30').toISOString(),
          dateEnd: moment('2019-10-20 11:00').toISOString(),
          desc: 'Grooming Frooming Fäncy Begroooofe',
          place: 'Alfresco Büro',
          title: 'Grooming'
        },
        {
          id: '121lf',
          dateStart: moment('2019-10-24 09:00').toISOString(),
          dateEnd: moment('2019-10-24 09:30').toISOString(),
          desc: 'Wichtiger Termin',
          place: 'Konferenzraum unten',
          title: 'Termin'
        },
        {
          id: '1t512',
          dateStart: moment('2019-12-11 11:00').toISOString(),
          dateEnd: moment('2019-12-11 11:30').toISOString(),
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
   * Returns month difference by ISO Date string
   * @param ISODate ISO Date string
   */
  getMonthDifferenceByISOString(ISODate: string): number {
    const aYear = moment(ISODate).year();
    const bYear = moment(moment()).year();
    const aMonth = moment(ISODate).month() + 1;
    const bMonth = moment(moment()).month() + 1;
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
   * Returns month difference by year and month numbers
   * @param year Year
   * @param month Month
   */
  getMonthDifferenceByYearMonth(year: number, month: number): number {
    const currentYear = this.getCurrentYear();
    const currentMonth = this.getCurrentMonth();
    let difference: number;
    const yearDiff = year - currentYear;
    const monthDiff = month - currentMonth;
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
   * Returns current day
   */
  getCurrentDayInMonth(): number {
    return moment().date();
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
   * Returns month strings
   */
  getMonthStrings(): string[] {
    return [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ];
  }

  /**
   * Returns short month strings
   */
  getMonthStringsShort(): string[] {
    return [
      'Jan',
      'Feb',
      'Mär',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez'
    ];
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

  /**
   * Returns number array by given length
   * @param length Length
   */
  getNumberArray(length: number) {
    return new Array(length);
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
   * Returns inner circle hours for time picker
   */
  getTimePickerHoursInner(): string[] {
    return [
      '0',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23'
    ];
  }

  /**
   * Returns outer circle hours for time picker
   */
  getTimePickerHoursOuter(): string[] {
    return ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  }

  /**
   * Returns minutes for time picker
   */
  getTimePickerMinutes(): string[] {
    return [
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55'
    ];
  }

  /**
   * Set month difference number
   * @param monthDifference Month difference
   */
  setMonthDifference(monthDifference: number): void {
    this.monthDifferenceSrc.next(monthDifference);
  }

  /**
   * Set date string
   * @param date Date
   */
  setDate(date: string): void {
    this.dateSrc.next(date);
  }

  /**
   * Set hour string
   * @param hour Hour
   */
  setHour(hour: string): void {
    this.hourSrc.next(hour);
  }

  /**
   * Set minute string
   * @param minute Minute
   */
  setMinute(minute: string): void {
    this.minuteSrc.next(minute);
  }

  /**
   * Set picker state
   * @param statePicker Picker state
   */
  setStatePicker(statePicker: string): void {
    this.statePickerSrc.next(statePicker);
  }
}
