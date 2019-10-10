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
  format: string;
  monthDays: number[];
  monthText: string;
  nextMonthDays: number[];
  prevMonthDays: number[];
  yearMonth: {
    year: number;
    month: number;
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.format = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.getMonthData();
  }

  getMonthData(): void {
    this.prevMonthDays = this.calendarService.getPrevMonthDays(
      this.currentMonth
    );
    this.monthDays = this.calendarService.getSelectedMonthDays(
      this.currentMonth
    );
    this.nextMonthDays = this.calendarService.getNextMonthDays(
      this.currentMonth
    );
    this.yearMonth = this.calendarService.getYearMonth(this.currentMonth);
    this.monthText = this.calendarService.getMonthText(this.yearMonth.month);
  }

  /**
   * Click handler for next month
   */
  nextMonth(): void {
    this.currentMonth++;
    this.getMonthData();
  }

  /**
   * Click handler for previous month
   */
  prevMonth(): void {
    this.currentMonth--;
    this.getMonthData();
  }
}
