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

import { Appointment } from '../../models/appointment';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit, OnChanges {
  @Input() appointments: Appointment[];
  @Input() selectedDate: string;
  @Output() closeCalendarDay = new EventEmitter<any>();

  selectedDayAppointments: Appointment[];
  date: string;

  constructor(private calendarService: CalendarService) {}

  ngOnChanges(changes: SimpleChanges) {
    const selectedDate: SimpleChange = changes.selectedDate;
    this.selectedDate = selectedDate.currentValue;
    this.initView();
  }

  ngOnInit() {
    this.initView();
  }

  initView() {
    this.selectedDayAppointments = this.calendarService.getActiveDayAppointmentsByDateString(
      this.selectedDate
    );
    this.date = moment(this.selectedDate).format('dddd, Do MMMM YYYY');
  }

  onCloseCalendarDay(): void {
    this.closeCalendarDay.emit();
  }
}
