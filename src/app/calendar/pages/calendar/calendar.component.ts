import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentMonth = 0;
  days: boolean[] = this.calendarService.getDays(this.currentMonth);
  format: string;
  yearMonth: {
    year: number;
    month: number;
  } = this.calendarService.getYearMonth(this.currentMonth);

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.format = moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  /**
   * Click handler for next month
   */
  nextMonth() {
    this.currentMonth++;
    this.days = this.calendarService.getDays(this.currentMonth);
    this.yearMonth = this.calendarService.getYearMonth(this.currentMonth);
  }

  /**
   * Click handler for previous month
   */
  prevMonth() {
    this.currentMonth--;
    this.days = this.calendarService.getDays(this.currentMonth);
    this.yearMonth = this.calendarService.getYearMonth(this.currentMonth);
  }
}
