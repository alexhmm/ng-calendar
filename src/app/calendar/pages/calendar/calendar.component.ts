import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Appointment } from '../../models/appointment';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  appointments: { appointments: Appointment[] };
  appointments$ = of(this.calendarService.getAppointments());
  activeMonth: number;
  activeYear: number;
  currentDay = moment().date();
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  monthDifference: number;
  monthText: string;
  ngUnsubscribe: Subject<object> = new Subject();
  stateCreateEdit = false;
  stateView = 'agenda';

  constructor(
    private router: Router,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.calendarService.monthDifference
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.getMonthData();
      });
    this.appointments$.subscribe(appointments => {
      this.appointments = appointments;
      this.getMonthData();
    });
  }

  getMonthData(): void {
    this.activeMonth = this.calendarService.getActiveMonth(
      this.monthDifference
    );
    this.activeYear = this.calendarService.getActiveYear(this.monthDifference);
    this.monthText = this.calendarService.getMonthText(this.activeMonth);
  }

  /**
   * Click handler for next month
   */
  nextMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference + 1);
  }

  onCloseAppointmentCreateEdit(): void {
    this.stateCreateEdit = false;
  }

  onCreateAppointment(): void {
    this.stateCreateEdit = true;
    this.router.navigate(['create']);
  }

  /**
   * Click handler for previous month
   */
  prevMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference - 1);
  }

  showCalendarAgenda(): void {
    this.stateView = 'agenda';
  }

  showCalendarList(): void {
    this.stateView = 'list';
  }
}
