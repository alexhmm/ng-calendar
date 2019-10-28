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
  activeMonth: number;
  activeYear: number;
  dayStrings = this.calendarService.getDayStrings();
  monthDifference: number;
  monthStrings = this.calendarService.getMonthStrings();
  nextMonthLength: number;
  ngUnsubscribe: Subject<object> = new Subject();
  prevMonthDays: number[];
  selectedDate: string;
  selectedMonth: number;
  selectedMonthLength: number;
  selectedYear: number;
  stateView: string;
  viewMonthRowHeight = '40px';
  viewYearCols = 3;
  viewYearRowHeight = '80px';

  constructor(
    private appService: AppService,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.appService.stateScreen
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(stateScreen => {
        if (stateScreen === 'xs') {
          this.viewYearCols = 2;
        } else {
          this.viewYearCols = 3;
        }
      });
    this.appService.stateHeight
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(innerHeight => {
        this.viewMonthRowHeight =
          Math.floor((innerHeight - 56 - 48) / 6.5 / 2) + 'px';
        this.viewYearRowHeight =
          Math.floor(innerHeight - 56 - 32) / (12 / this.viewYearCols) + 'px';
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
    this.calendarService.activeMonth
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activeMonth => (this.activeMonth = activeMonth));
    this.calendarService.activeYear
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activeYear => (this.activeYear = activeYear));
  }

  /**
   * Sets view data
   */
  getMonthData(): void {
    this.selectedMonth = this.calendarService.getMonthByMonthDifference(
      this.monthDifference
    );
    this.selectedYear = this.calendarService.getYearByMonthDifference(
      this.monthDifference
    );
    // this.activeMonth = this.selectedMonth;
    // this.activeYear = this.selectedYear;
    this.calendarService.setActiveMonth(this.selectedMonth);
    this.calendarService.setActiveYear(this.selectedYear);
    this.activeAppointments = this.calendarService.getActiveAppointments(
      this.selectedYear,
      this.selectedMonth
    );
    this.selectedMonthLength = this.calendarService.getMonthLength(
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
  getSelectedDayAppointmentLength(activeDay: number): number {
    return this.calendarService.getActiveDayAppointmentLength(
      this.activeAppointments,
      activeDay,
      this.selectedMonth,
      this.selectedYear
    );
  }

  /**
   * Returns first appointment title of active day
   * @param activeDay Active day
   */
  getSelectedDayAppointmentTitle(activeDay: number): string {
    return this.calendarService.getActiveDayAppointmentTitle(
      this.activeAppointments,
      activeDay,
      this.selectedMonth,
      this.selectedYear
    );
  }

  /**
   * Open up CalendarDayComponent dialog
   * @param activeDay Active day
   */
  openCalendarDay(activeDay: number) {
    this.selectedDate = this.calendarService.getDateStringByNumbers(
      activeDay,
      this.selectedMonth,
      this.selectedYear
    );
  }

  /**
   * Closes CalendarDayComponent dialog
   */
  onCloseCalendarDay() {
    this.selectedDate = null;
  }

  /**
   * Handler for setting month view by click
   */
  onSetMonthByClick(month: number): void {
    this.setMonthByClick.emit(month);
  }
}
