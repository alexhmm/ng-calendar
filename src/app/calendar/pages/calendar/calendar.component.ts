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
  stateAgenda: string;
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
    this.calendarService.stateAgenda
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(stateAgenda => {
        this.stateAgenda = stateAgenda;
      });
    this.appointments$.subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  /**
   * Sets view data
   */
  getMonthData(): void {
    this.activeMonth = this.calendarService.getMonthByMonthDifference(
      this.monthDifference
    );
    this.activeYear = this.calendarService.getYearByMonthDifference(
      this.monthDifference
    );
    this.monthText = this.calendarService.getMonthText(this.activeMonth);
  }

  /**
   * Handler for setting next month
   */
  nextMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference + 1);
  }

  /**
   * Handler for setting next year
   */
  nextYear(): void {
    this.activeYear++;
    this.calendarService.setActiveYear(this.activeYear);
  }

  onCloseAppointmentCreateEdit(): void {
    this.stateCreateEdit = false;
  }

  onCreateAppointment(): void {
    this.stateCreateEdit = true;
    this.router.navigate(['create']);
  }

  /**
   * Handler for setting month view by click
   * @param month Month
   */
  onSetMonthByClick(month: number) {
    const monthDifference = this.calendarService.getMonthDifferenceByYearMonth(
      this.activeYear,
      month
    );
    this.calendarService.setMonthDifference(monthDifference);
    this.calendarService.setStateAgenda('month');
  }

  /**
   * Handler for setting previous month
   */
  prevMonth(): void {
    this.calendarService.setMonthDifference(this.monthDifference - 1);
  }

  /**
   * Handler for setting previous year
   */
  prevYear(): void {
    this.activeYear--;
    this.calendarService.setActiveYear(this.activeYear);
  }

  /**
   * Sets agenda view state
   * @param state Agenda state
   */
  setStateAgenda(state: string): void {
    this.calendarService.setStateAgenda(state);
    if (state === 'year' && this.stateView === 'list') {
      this.stateView = 'agenda';
    }
  }

  /**
   * Sets view state
   */
  setStateView(): void {
    if (this.stateView === 'list') {
      this.stateView = 'agenda';
    } else {
      this.calendarService.setStateAgenda('month');
      this.stateView = 'list';
    }
  }
}
