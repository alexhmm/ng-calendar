import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentMonth: number = this.calendarService.getCurrentMonth();
  days: any[] = this.calendarService.getDays(8);
  format: string;

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.format = moment().format('MMMM Do YYYY, h:mm:ss a');
    const start = moment()
      .startOf('month')
      .day();
    console.log('start', start);
    const end = moment()
      .endOf('month')
      .day();
    console.log('end', end);
    const length = moment().daysInMonth();
    console.log('length', length);
    const month = moment()
      .month(-2)
      .daysInMonth();
    console.log('month', month);
    console.log('getCurrentMonth()', this.currentMonth);
    // this.calendarService.getDays();
  }
}
