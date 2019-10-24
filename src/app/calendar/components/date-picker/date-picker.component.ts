import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  // @Input() selectedDate: string;
  @Output() setDate = new EventEmitter<string>();

  activeDate: string;
  activeMonth: number;
  activeMonthLength: number;
  activeYear: number;
  currentDay = this.calendarService.getCurrentDayInMonth();
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  dayStrings = this.calendarService.getDayStrings();
  monthDifference: number;
  monthStringsShort = this.calendarService.getMonthStringsShort();
  monthText: string;
  nextMonthLength: number;
  ngUnsubscribe: Subject<object> = new Subject();
  prevMonthDays: number[];
  selectedDate: string;
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  stateView = 'month';

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.monthDifference
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.initMonthData();
      });
    this.calendarService.date
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(date => {
        this.selectedDate = date;
        this.onSetViewData(
          moment(this.selectedDate).date() || moment(new Date()).date()
        );
      });
  }

  /**
   * Inits month view data
   */
  initMonthData(): void {
    this.activeMonth = this.calendarService.getActiveMonth(
      this.monthDifference
    );
    this.activeYear = this.calendarService.getActiveYear(this.monthDifference);
    this.monthText = this.calendarService.getMonthText(this.activeMonth);
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
   * Handler for next month
   */
  nextMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference + 1);
  }

  /**
   * Handler for next year
   */
  nextYear(): void {
    this.activeYear++;
  }

  /**
   * Handler for setting date on click
   * @param day Day number
   */
  onSetDate(day: number): void {
    this.onSetViewData(day);
    const date = this.calendarService.getDateStringByNumbers(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear
    );
    this.selectedDate = moment(date).toISOString();
    // this.setDate.emit(this.selectedDate);
    this.calendarService.setDate(this.selectedDate);
    this.calendarService.setStatePicker('hour');
  }

  /**
   * Handler for setting month difference by click
   * @param month Month
   */
  onSetMonthByClick(month: number): void {
    const monthDifference = this.calendarService.getMonthDifferenceByYearMonth(
      this.activeYear,
      month
    );
    this.calendarService.setMonthDifference(monthDifference);
    this.stateView = 'month';
  }

  /**
   * Handler for setting month difference by current selection
   */
  onSetMonthBySelection(): void {
    const monthDifference = this.calendarService.getMonthDifferenceByYearMonth(
      this.selectedYear,
      this.selectedMonth
    );
    this.calendarService.setMonthDifference(monthDifference);
    this.stateView = 'month';
  }

  /**
   * Selects view data
   * @param day Day number
   */
  onSetViewData(day: number): void {
    this.selectedDay = day;
    this.selectedMonth = this.activeMonth;
    this.selectedYear = this.activeYear;
  }

  /**
   * Set view state
   * @param stateView View state
   */
  onSetStateView(stateView: string) {
    this.stateView = stateView;
  }

  /**
   * Handler for previous month
   */
  prevMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference - 1);
  }

  /**
   * Handler for previous year
   */
  prevYear(): void {
    this.activeYear--;
  }
}
