import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

import { AppointmentView } from '../../models/appointment-view';

@Component({
  selector: 'app-calendar-list-item',
  templateUrl: './calendar-list-item.component.html',
  styleUrls: ['./calendar-list-item.component.scss']
})
export class CalendarListItemComponent implements OnInit {
  @Input() appointment: AppointmentView;
  @Input() currentMonth: number;
  @Input() currentYear: number;
  @Input() date: number;
  @Input() yearMonth: {
    year: number;
    month: number;
  };

  dateStart: string;
  day: string;
  timeEnd: string;
  timeStart: string;

  constructor() {}

  ngOnInit() {
    this.dateStart = moment(this.appointment.dateStart).format(
      'MMMM Do YYYY, h:mm'
    );
    this.day = moment(this.appointment.dateStart).format('dd');
    this.timeEnd = moment(this.appointment.dateEnd).format('h:mm');
    this.timeStart = moment(this.appointment.dateStart).format('h:mm');
  }
}
