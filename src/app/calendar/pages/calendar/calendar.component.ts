import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { CalendarService } from '../../services/calendar.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  appointments: { appointments: any[] };
  appointments$ = of(this.calendarService.getAppointments());
  activeMonth: number;
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  date: number;
  format: string;
  monthText: string;
  stateView = 'agenda';
  yearMonth: {
    year: number;
    month: number;
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.format = moment().format('YYYY-MM-DD');
    this.date = moment().date();
    this.calendarService.activeMonth.subscribe(activeMonth => {
      this.activeMonth = activeMonth;
      this.getMonthData();
    });
    this.appointments$.subscribe(appointments => {
      this.appointments = appointments;
      this.getMonthData();
    });
  }

  getMonthData(): void {
    this.yearMonth = this.calendarService.getYearMonth(this.activeMonth);
    this.monthText = this.calendarService.getMonthText(this.yearMonth.month);
  }

  /**
   * Click handler for next month
   */
  nextMonth(): void {
    this.calendarService.setActiveMonth(this.activeMonth + 1);
  }

  /**
   * Click handler for previous month
   */
  prevMonth(): void {
    this.calendarService.setActiveMonth(this.activeMonth - 1);
  }

  showCalendarAgenda(): void {
    this.stateView = 'agenda';
  }

  showCalendarList(): void {
    this.stateView = 'list';
  }
}
