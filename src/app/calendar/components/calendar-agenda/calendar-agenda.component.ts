import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Appointment } from '../../models/appointment';
import { AppService } from 'src/app/shared/services/app/app.service';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-agenda',
  templateUrl: './calendar-agenda.component.html',
  styleUrls: ['./calendar-agenda.component.scss']
})
export class CalendarAgendaComponent implements OnInit {
  @Input() currentDay: number;
  @Input() currentMonth: number;
  @Input() currentYear: number;
  @Output() setMonthByClick = new EventEmitter<number>();

  activeAppointments: Appointment[];
  activeDate: string;
  activeMonth: number;
  activeMonthLength: number;
  activeYear: number;
  dayStrings = this.calendarService.getDayStrings();
  monthDifference: number;
  monthStrings = this.calendarService.getMonthStrings();
  nextMonthLength: number;
  ngUnsubscribe: Subject<object> = new Subject();
  prevMonthDays: number[];
  stateView: string;
  viewMonthRowHeight = '40px';
  viewYearCols = 3;
  viewYearRowHeight = '80px';

  constructor(
    private appService: AppService,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.appService.stateHeight
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(innerHeight => {
        this.viewMonthRowHeight =
          Math.floor((innerHeight - 56 - 48) / 6.5 / 2) + 'px';
        this.viewYearRowHeight =
          Math.floor(innerHeight - 56 - 32) / (12 / this.viewYearCols) + 'px';
      });
    this.appService.stateScreen
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(stateScreen => {
        if (stateScreen === 'xs') {
          this.viewYearCols = 2;
        } else {
          this.viewYearCols = 3;
        }
      });
    this.calendarService.activeYear
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activeYear => {
        this.activeYear = activeYear;
      });
    this.calendarService.monthDifference
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.getMonthData();
      });
    this.calendarService.stateAgenda
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(stateAgenda => {
        this.stateView = stateAgenda;
      });
  }

  getMonthData(): void {
    this.activeMonth = this.calendarService.getActiveMonth(
      this.monthDifference
    );
    this.activeYear = this.calendarService.getActiveYear(this.monthDifference);
    this.activeAppointments = this.calendarService.getActiveAppointments(
      this.activeYear,
      this.activeMonth
    );
    this.activeMonthLength = this.calendarService.getMonthLength(
      this.monthDifference
    );
    this.prevMonthDays = this.calendarService.getPrevMonthDays(
      this.monthDifference
    );
    this.nextMonthLength = this.calendarService.getNextMonthLength(
      this.monthDifference
    );
  }

  /**
   * Returns number array of given month length
   * @param monthLength Month length
   */
  getMonthLength(monthLength: number): number[] {
    return new Array(monthLength);
  }

  /**
   * Returns appointment length of active day
   * @param activeDay Active day
   */
  getActiveDayAppointmentLength(activeDay: number): number {
    return this.calendarService.getActiveDayAppointmentLength(
      this.activeAppointments,
      activeDay,
      this.activeMonth,
      this.activeYear
    );
  }

  /**
   * Returns first appointment title of active day
   * @param activeDay Active day
   */
  getActiveDayAppointmentTitle(activeDay: number): string {
    return this.calendarService.getActiveDayAppointmentTitle(
      this.activeAppointments,
      activeDay,
      this.activeMonth,
      this.activeYear
    );
  }

  /**
   * Open up CalendarDayComponent dialog
   * @param activeDay Active day
   */
  openCalendarDay(activeDay: number) {
    this.activeDate = this.calendarService.getDateStringByNumbers(
      activeDay,
      this.activeMonth,
      this.activeYear
    );
  }

  /**
   * Closes CalendarDayComponent dialog
   */
  onCloseCalendarDay() {
    this.activeDate = null;
  }

  /**
   * Handler for setting month view by click
   */
  onSetMonthByClick(month: number): void {
    this.setMonthByClick.emit(month);
    // this.getMonthData();
  }
}
