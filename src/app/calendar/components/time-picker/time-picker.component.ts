import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  @Input() selectedTime: string;
  @Output() selectHour = new EventEmitter<number>();
  @Output() selectMinute = new EventEmitter<number>();

  hour: number;
  minute: number;
  stateTimePicker = 'hour';
  viewHoursInner = this.calendarService.getTimePickerHoursInner();
  viewHoursOuter = this.calendarService.getTimePickerHoursOuter();
  viewMinutes = this.calendarService.getNumberArray(60);

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {}

  onClickHour(hour: number): void {
    this.hour = hour;
    console.log('onClickHour', this.hour);
  }

  onClickMinute(minute: number): void {
    this.minute = minute;
    console.log('onClickMinute', this.minute);
  }
}
