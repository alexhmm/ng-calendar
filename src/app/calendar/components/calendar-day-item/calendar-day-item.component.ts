import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-calendar-day-item',
  templateUrl: './calendar-day-item.component.html',
  styleUrls: ['./calendar-day-item.component.scss']
})
export class CalendarDayItemComponent implements OnInit {
  @Input() appointment: Appointment;

  dateEnd: string;
  dateStart: string;
  timeEnd: string;
  timeStart: string;

  constructor() {}

  ngOnInit() {
    this.dateEnd = moment(this.appointment.dateEnd).format('MMMM Do YYYY');
    this.dateStart = moment(this.appointment.dateStart).format('MMMM Do YYYY');
    this.timeEnd = moment(this.appointment.dateEnd).format('LT');
    this.timeStart = moment(this.appointment.dateStart).format('LT');
  }
}
