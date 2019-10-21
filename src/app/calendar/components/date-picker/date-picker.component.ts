import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() selectedDate: string;
  @Output() selectDate = new EventEmitter<string>();

  activeDate: string;
  activeMonth: number;
  activeMonthLength: number;
  activeYear: number;
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  dayStrings = this.calendarService.getDayStrings();
  monthDifference: number;
  monthText: string;
  nextMonthLength: number;
  ngUnsubscribe: Subject<object> = new Subject();
  prevMonthDays: number[];
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.monthDifference
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.initMonthData();
      });
    this.onSelectViewData(
      moment(this.selectedDate).date() || moment(new Date()).date()
    );
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
   * Click handler for next month
   */
  nextMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference + 1);
  }

  /**
   * Selects view data
   * @param day Day number
   */
  onSelectViewData(day: number) {
    this.selectedDay = day;
    this.selectedMonth = this.activeMonth;
    this.selectedYear = this.activeYear;
  }

  /**
   * Selects date on click
   * @param day Day number
   */
  onSelectDate(day: number) {
    this.onSelectViewData(day);
    const date = this.calendarService.getDateStringByNumbers(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear
    );
    this.selectedDate = moment(date).toISOString();
    this.selectDate.emit(this.selectedDate);
  }

  /**
   * Click handler for previous month
   */
  prevMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference - 1);
  }
}
