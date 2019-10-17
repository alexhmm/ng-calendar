import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-calendar-list-item',
  templateUrl: './calendar-list-item.component.html',
  styleUrls: ['./calendar-list-item.component.scss']
})
export class CalendarListItemComponent implements OnInit {
  @Input() appointment: Appointment;
  @Input() currentDay: number;
  @Input() currentMonth: number;
  @Input() currentYear: number;

  activeDay: number;
  dateStart: string;
  day: string;
  timeEnd: string;
  timeStart: string;

  constructor() {}

  ngOnInit() {
    this.activeDay = moment(this.appointment.dateStart).date();
    this.dateStart = moment(this.appointment.dateStart).format(
      'MMMM Do YYYY, h:mm'
    );
    this.day = moment(this.appointment.dateStart).format('dd');
    this.timeEnd = moment(this.appointment.dateEnd).format('LT');
    this.timeStart = moment(this.appointment.dateStart).format('LT');
  }
}
