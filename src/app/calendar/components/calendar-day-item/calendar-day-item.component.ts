import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { AppointmentView } from '../../models/appointment-view';

@Component({
  selector: 'app-calendar-day-item',
  templateUrl: './calendar-day-item.component.html',
  styleUrls: ['./calendar-day-item.component.scss']
})
export class CalendarDayItemComponent implements OnInit {
  @Input() appointment: AppointmentView;

  dateEnd: string;
  dateStart: string;
  timeEnd: string;
  timeStart: string;

  constructor() {}

  ngOnInit() {
    this.dateEnd = moment(this.appointment.dateEnd).format('MMMM Do YYYY');
    this.dateStart = moment(this.appointment.dateStart).format('MMMM Do YYYY');
    this.timeEnd = moment(this.appointment.dateEnd).format('h:mm');
    this.timeStart = moment(this.appointment.dateStart).format('h:mm');
  }
}
