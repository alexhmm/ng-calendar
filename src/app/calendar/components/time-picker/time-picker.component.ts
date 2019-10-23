import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { CalendarService } from '../../services/calendar.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  hour: string;
  hourView: string;
  minute: string;
  ngUnsubscribe: Subject<object> = new Subject();
  stateTimePicker: string;
  viewHoursInner = this.calendarService.getTimePickerHoursInner();
  viewHoursOuter = this.calendarService.getTimePickerHoursOuter();
  viewMinutes = this.calendarService.getTimePickerMinutes();

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.hour
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(hour => {
        this.hour = hour;
        if (this.hour && this.hour.indexOf('0') === 0) {
          this.hourView = this.hour.substr(1, 1);
        } else {
          this.hourView = this.hour;
        }
      });
    this.calendarService.minute
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(minute => (this.minute = minute));
    this.calendarService.statePicker
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(statePicker => (this.stateTimePicker = statePicker));
  }

  /**
   * Handler for click on hour
   * @param hour Hour
   */
  onSetHour(hour: string): void {
    if (+hour < 10) {
      this.hour = '0' + hour;
    } else {
      this.hour = hour;
    }
    this.calendarService.setHour(this.hour);
    this.calendarService.setStatePicker('minute');
  }

  /**
   * Handler for click on minute
   * @param minute Minute
   */
  onSetMinute(minute: string): void {
    this.calendarService.setMinute(minute);
  }
}
