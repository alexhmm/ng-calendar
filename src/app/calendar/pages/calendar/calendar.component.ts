import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { CalendarService } from '../../services/calendar.service';
import { of } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  appointments: { appointments: any[] };
  appointments$ = of(this.calendarService.getAppointments());
  activeAppointmentDays: number[] = [];
  activeMonth = 0;
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  date: number;
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
    this.format = moment().format('YYYY-MM-DD');
    this.date = moment().date();
    this.appointments$.subscribe(appointments => {
      this.appointments = appointments;
      this.getMonthData();
    });
  }

  getMonthData(): void {
    this.prevMonthDays = this.calendarService.getPrevMonthDays(
      this.activeMonth
    );
    this.monthDays = this.calendarService.getSelectedMonthDays(
      this.activeMonth
    );
    this.nextMonthDays = this.calendarService.getNextMonthDays(
      this.activeMonth
    );
    this.yearMonth = this.calendarService.getYearMonth(this.activeMonth);
    this.monthText = this.calendarService.getMonthText(this.yearMonth.month);
    this.activeAppointmentDays = this.calendarService.getActiveAppointmentDays(
      this.appointments.appointments,
      this.yearMonth.year,
      this.yearMonth.month
    );
  }

  /**
   * Click handler for next month
   */
  nextMonth(): void {
    this.activeMonth++;
    this.getMonthData();
  }

  /**
   * Click handler for previous month
   */
  prevMonth(): void {
    this.activeMonth--;
    this.getMonthData();
  }
}
