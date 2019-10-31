import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

import { Appointment } from '../models/appointment';
import { AppointmentView } from '../models/appointment-view';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  activeMonthSrc = new BehaviorSubject(null);
  activeMonth = this.activeMonthSrc.asObservable();
  activeYearSrc = new BehaviorSubject(null);
  activeYear = this.activeYearSrc.asObservable();
  dateSrc = new BehaviorSubject(null);
  date = this.dateSrc.asObservable();
  hourSrc = new BehaviorSubject(null);
  hour = this.hourSrc.asObservable();
  minuteSrc = new BehaviorSubject(null);
  minute = this.minuteSrc.asObservable();
  monthDifferenceSrc = new BehaviorSubject(null);
  monthDifference = this.monthDifferenceSrc.asObservable();
  stateAgendaSrc = new BehaviorSubject('month');
  stateAgenda = this.stateAgendaSrc.asObservable();
  statePickerSrc = new BehaviorSubject('date');
  statePicker = this.statePickerSrc.asObservable();

  constructor() {
    this.setMonthDifference(0);
  }

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
          place: 'Konferenzraum 1',
          title: 'Besprechnung'
        },
        {
          id: 'isu12',
          dateStart: moment('2019-11-15 09:00').toISOString(),
          dateEnd: moment('2019-11-15 09:30').toISOString(),
          desc: 'Planning Sprint 14',
          place: 'Konferenzraum 1',
          title: 'Planning'
        },
        {
          id: '1241u',
          dateStart: moment('2019-11-15 11:00').toISOString(),
          dateEnd: moment('2019-11-15 12:45').toISOString(),
          desc: 'Tische in den Keller bringen.',
          place: 'Haus 2',
          title: 'Aufräumen'
        },
        {
          id: '1241f',
          dateStart: moment('2019-11-16 08:00').toISOString(),
          dateEnd: moment('2019-11-16 09:00').toISOString(),
          desc: 'Bewerbungsgespräch mit Frau Mustermann',
          place: 'Konferenzraum 2',
          title: 'Bewerbungsgespräch'
        },
        {
          id: '1241g',
          dateStart: moment('2019-11-16 09:00').toISOString(),
          dateEnd: moment('2019-11-16 10:45').toISOString(),
          desc: 'Grooming Woche 14',
          place: 'Loft',
          title: 'Grooming'
        },
        {
          id: '1241u',
          dateStart: moment('2019-11-16 11:00').toISOString(),
          dateEnd: moment('2019-11-16 12:45').toISOString(),
          desc: 'Planning Woche 15',
          place: 'Konferenzraum 2',
          title: 'Planning'
        },
        {
          id: '12482',
          dateStart: moment('2019-11-16 13:00').toISOString(),
          dateEnd: moment('2019-11-16 15:45').toISOString(),
          desc: 'Nachbesprechnung',
          place: 'Konferenzraum 2',
          title: 'Review'
        },
        {
          id: '1241g',
          dateStart: moment('2019-11-16 09:00').toISOString(),
          dateEnd: moment('2019-11-16 10:45').toISOString(),
          desc: 'Retroperspektive Projekt.',
          place: 'Konferenzraum 1',
          title: 'Retro'
        },
        {
          id: '12482',
          dateStart: moment('2019-11-17 13:00').toISOString(),
          dateEnd: moment('2019-11-17 15:45').toISOString(),
          desc: 'Team Meeting',
          place: 'Loft',
          title: 'Team Meeting'
        },
        {
          id: 'fsfqf',
          dateStart: moment('2019-11-19 10:30').toISOString(),
          dateEnd: moment('2019-11-20 11:00').toISOString(),
          desc: 'Workshop 2 Tage',
          place: 'Loft',
          title: 'Workshop'
        },
        {
          id: '121lf',
          dateStart: moment('2019-11-24 09:00').toISOString(),
          dateEnd: moment('2019-11-24 09:30').toISOString(),
          desc: 'Standup',
          place: 'Konferenzraum 1',
          title: 'Termin'
        },
        {
          id: '1t512',
          dateStart: moment('2019-12-11 11:00').toISOString(),
          dateEnd: moment('2019-12-11 11:30').toISOString(),
          desc: 'Review',
          place: 'Konferenzraum 2',
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
   * Returns first appointment from active day
   * @param activeAppointments Active appointments
   * @param activeDay Active day
   * @param activeMonth Active month
   * @param activeYear Active year
   */
  getActiveDayAppointmentFirst(
    activeAppointments: Appointment[],
    activeDay: number,
    activeMonth: number,
    activeYear: number
  ): AppointmentView {
    // Find first appointment with matched date
    const appointment = activeAppointments.find(activeAppointment =>
      activeAppointment.dateStart.includes(
        this.getDateStringByNumbers(activeDay, activeMonth, activeYear)
      )
    );
    if (appointment) {
      const appointmentView = {
        id: appointment.id,
        dateStart: appointment.dateStart,
        dateEnd: appointment.dateEnd,
        desc: appointment.desc,
        place: appointment.place,
        timeEnd: moment(appointment.dateEnd).format('LT'),
        timeStart: moment(appointment.dateStart).format('LT'),
        title: appointment.title
      };
      return appointmentView;
    } else {
      return null;
    }
  }

  /**
   * Returns active day appointments by date string
   * @param date Date string
   */
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
  getMonthByMonthDifference(monthDifference: number) {
    return moment()
      .add(monthDifference, 'months')
      .month();
  }

  /**
   * Returns year by month difference number
   * @param monthDifference Month difference
   */
  getYearByMonthDifference(monthDifference: number): number {
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
   * Sets active month
   * @param month Month
   */
  setActiveMonth(month: number) {
    this.activeMonthSrc.next(month);
  }

  /**
   * Sets active year
   * @param year Year
   */
  setActiveYear(year: number) {
    this.activeYearSrc.next(year);
  }

  /**
   * Sets month difference number
   * @param monthDifference Month difference
   */
  setMonthDifference(monthDifference: number): void {
    this.monthDifferenceSrc.next(monthDifference);
  }

  /**
   * Sets date string
   * @param date Date
   */
  setDate(date: string): void {
    this.dateSrc.next(date);
  }

  /**
   * Sets hour string
   * @param hour Hour
   */
  setHour(hour: string): void {
    this.hourSrc.next(hour);
  }

  /**
   * Sets minute string
   * @param minute Minute
   */
  setMinute(minute: string): void {
    this.minuteSrc.next(minute);
  }

  /**
   * Sets agenda state
   * @param stateAgenda Agenda state
   */
  setStateAgenda(stateAgenda: string): void {
    this.stateAgendaSrc.next(stateAgenda);
  }

  /**
   * Sets picker state
   * @param statePicker Picker state
   */
  setStatePicker(statePicker: string): void {
    this.statePickerSrc.next(statePicker);
  }
}
