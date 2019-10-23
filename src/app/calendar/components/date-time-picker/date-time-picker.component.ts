import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {
  // @Input() selectedDate: string;
  @Input() type: string;
  @Output() setDate = new EventEmitter<{ type: string; date: string }>();
  @Output() closeDateTimePicker = new EventEmitter<any>();

  activeDate: string;
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  dayStrings = this.calendarService.getDayStrings();
  hour: string;
  minute: string;
  ngUnsubscribe: Subject<object> = new Subject();
  selectedDate: string;
  selectedTime: string;
  statePicker: string;

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.hour
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(hour => {
        this.hour = hour;
        this.selectedTime = this.hour + ':' + this.minute;
      });
    this.calendarService.minute
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(minute => {
        this.minute = minute;
        this.selectedTime = this.hour + ':' + this.minute;
      });
    this.calendarService.date
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(date => {
        this.selectedDate = date;
        this.activeDate = moment(this.selectedDate).format(
          'dddd, Do MMMM YYYY'
        );
      });
    this.calendarService.statePicker
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        stateDateTimePicker => (this.statePicker = stateDateTimePicker)
      );
    this.setPickerData();
  }

  /**
   * Handler for closing date time picker
   */
  onCloseDateTimePicker(): void {
    this.closeDateTimePicker.emit();
  }

  /**
   * Handler for back event
   */
  onGoBack(): void {
    if (this.statePicker === 'hour') {
      this.calendarService.setStatePicker('date');
    } else if (this.statePicker === 'minute') {
      this.calendarService.setStatePicker('hour');
    }
  }

  /**
   * Handler for setting date
   * @param date Date
   */
  onSetDate(date: string): void {
    this.activeDate = moment(date).format('dddd, Do MMMM YYYY');
    this.selectedDate = date;
  }

  /**
   * Handler for setting picker state
   * @param statePicker Picker state
   */
  onSetStatePicker(statePicker: string): void {
    this.calendarService.setStatePicker(statePicker);
  }

  /**
   * Handler for submitting date and time
   */
  onSubmit(): void {
    const dateString = moment(this.selectedDate).format('YYYY-MM-DD');
    const date = moment(dateString + ' ' + this.selectedTime).toISOString();
    this.setDate.emit({ type: this.type, date });
    this.calendarService.setStatePicker('date');
  }

  /**
   * Set data for view
   */
  setPickerData(): void {
    this.activeDate = moment(this.selectedDate).format('dddd, Do MMMM YYYY');
    this.calendarService.setHour(
      moment(this.selectedDate)
        .format('LT')
        .substr(
          0,
          moment(this.selectedDate)
            .format('LT')
            .indexOf(':')
        )
    );
    this.calendarService.setMinute(moment(this.selectedDate).format('mm'));
    this.selectedTime = moment(this.selectedDate).format('LT');
  }
}
