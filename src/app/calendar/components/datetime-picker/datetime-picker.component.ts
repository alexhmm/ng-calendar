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
  @Input() selectedDate: string;
  @Input() type: string;
  @Output() selectDate = new EventEmitter<{ type: string; date: string }>();
  @Output() closeDateTimePicker = new EventEmitter<any>();

  activeDate: string;
  activeMonth: number;
  activeMonthLength: number;
  activeYear: number;
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  dayStrings = this.calendarService.getDayStrings();
  hour: string;
  minute: string;
  monthDifference: number;
  monthText: string;
  nextMonthLength: number;
  ngUnsubscribe: Subject<object> = new Subject();
  prevMonthDays: number[];
  rowHeight = '30px';
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  stateInputTimer = 0;
  time: string;
  timeStrings = this.calendarService.getTimeStrings();

  constructor(
    private appService: AppService,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.hour = moment(this.selectedDate)
      .format('LT')
      .substr(
        0,
        moment(this.selectedDate)
          .format('LT')
          .indexOf(':')
      );
    this.minute = moment(this.selectedDate).format('mm');
    this.time = moment(this.selectedDate).format('LT');
    this.calendarService.monthDifference
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.getMonthData();
      });
    this.onSelectDay(
      moment(this.selectedDate).date() || moment(new Date()).date()
    );
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

  onInputTimeHourChange(event: string): void {
    // this.time = event;
    // this.stateInputTimer++;
    // const timer: number = this.stateInputTimer;
    // // Emits search after 2s last input change
    // setTimeout(() => {
    //   if (timer === this.stateInputTimer) {
    //     const time = this.calendarService.checkTimeString(this.time);
    //     console.log('newTime', time);
    //     this.stateInputTimer = 0;

    //     // this.stateSearchQuery = query;
    //     // this.getProjects('', query);
    //     // // Sets filter to 'all'
    //     // this.filterValue = 'all';
    //   }
    // }, 1000);
    this.hour = event;
    this.time = this.hour + ':' + this.minute;
  }

  onInputTimeMinuteChange(event: string): void {
    this.minute = event;
    this.time = this.hour + ':' + this.minute;
  }

  onSelectDate(): void {
    const date = this.calendarService.getDateStringByNumbers(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear
    );
    const dateTime = date + ' ' + this.time;
    this.selectDate.emit({ type: this.type, date: dateTime });
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
   * Handler on mat select change
   * @param event Time
   */
  onSelectTimeChange(event): void {
    this.time = event[0] + ':' + event[1];
    this.hour = event[0];
    this.minute = event[1];
  }

  /**
   * Click handler for previous month
   */
  prevMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference - 1);
  }
}
