import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import * as moment from 'moment';

import { AppointmentView } from '../../models/appointment-view';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit, OnChanges {
  @Input() activeDate: string;
  @Input() appointments: AppointmentView[];
  @Output() closeCalendarDay = new EventEmitter<string>();

  activeDayAppointments: AppointmentView[];
  date: string;

  constructor(private calendarService: CalendarService) {}

  ngOnChanges(changes: SimpleChanges) {
    const activeDate: SimpleChange = changes.activeDate;
    this.activeDate = activeDate.currentValue;
    this.initView();
  }

  ngOnInit() {
    this.initView();
  }

  initView() {
    this.activeDayAppointments = this.calendarService.getActiveDayAppointmentsByISOString(
      this.appointments,
      this.activeDate.substring(0, 10)
    );
    this.date = moment(this.activeDate).format('dddd, Do MMMM YYYY');
  }

  onCloseCalendarDay(): void {
    this.closeCalendarDay.emit(null);
  }
}
