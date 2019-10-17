import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { AppService } from 'src/app/shared/services/app/app.service';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {
  @Input() type: string;
  @Output() selectDate = new EventEmitter<{ type: string; date: string }>();
  @Output() closeDateTimePicker = new EventEmitter<any>();

  activeDate: string;
  activeMonth: number;
  activeMonthLength: number;
  activeYear: number;
  currentDay = moment().date();
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  dayStrings = this.calendarService.getDayStrings();
  hours = this.appService.getNumberArray(24);
  minutes = this.appService.getNumberArray(60);
  monthDifference: number;
  monthText: string;
  nextMonthLength: number;
  ngUnsubscribe: Subject<object> = new Subject();
  prevMonthDays: number[];
  rowHeight = '30px';
  selectedDate: string;
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;

  constructor(
    private appService: AppService,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.calendarService.monthDifference
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.getMonthData();
      });
    this.onSelectDay(this.currentDay);
  }

  getMonthData(): void {
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

  onCloseDateTimePicker(): void {
    this.closeDateTimePicker.emit();
  }

  onSelectDate(): void {
    const date = this.calendarService.getDateStringByNumbers(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear
    );
    this.selectDate.emit({ type: this.type, date });
  }

  onSelectDay(day: number) {
    this.selectedDay = day;
    this.selectedMonth = this.activeMonth;
    this.selectedYear = this.activeYear;
    const date = this.calendarService.getDateStringByNumbers(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear
    );
    this.selectedDate = moment(date).format('dddd, Do MMMM YYYY');
  }

  /**
   * Click handler for previous month
   */
  prevMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference - 1);
  }
}
