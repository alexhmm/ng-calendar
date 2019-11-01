import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Appointment } from '../../models/appointment';
import { CalendarService } from '../../services/calendar.service';
import {
  slideBottomToTop,
  zoom
} from 'src/app/shared/services/animations/animations';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [slideBottomToTop, zoom]
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
  stateAnim = false;
  stateCreateEdit = false;
  stateAgenda: string;
  stateSlide = 'slideNext';
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
    this.stateAnim = true;
    this.stateSlide = 'show';
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
    this.stateAnim = false;
    setTimeout(() => {
      this.calendarService.setMonthDifference(this.monthDifference + 1);
      this.stateAnim = true;
    }, 105);
  }

  /**
   * Handler for setting next year
   */
  nextYear(): void {
    this.stateAnim = false;
    setTimeout(() => {
      this.activeYear++;
      this.calendarService.setActiveYear(this.activeYear);
      this.stateAnim = true;
    }, 105);
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
    this.stateAnim = false;
    setTimeout(() => {
      this.calendarService.setMonthDifference(this.monthDifference - 1);
      this.stateAnim = true;
    }, 105);
  }

  /**
   * Handler for setting previous year
   */
  prevYear(): void {
    this.stateAnim = false;
    setTimeout(() => {
      this.activeYear--;
      this.calendarService.setActiveYear(this.activeYear);
      this.stateAnim = true;
    }, 105);
  }

  /**
   * Sets agenda view state
   * @param state Agenda state
   */
  setStateAgenda(state: string): void {
    this.stateAnim = false;
    setTimeout(() => {
      this.calendarService.setStateAgenda(state);
      if (state === 'year' && this.stateView === 'list') {
        this.stateView = 'agenda';
      }
      this.stateAnim = true;
    }, 105);
  }

  /**
   * Sets view state
   */
  setStateView(): void {
    this.stateAnim = false;
    setTimeout(() => {
      if (this.stateView === 'list') {
        this.stateView = 'agenda';
      } else {
        this.calendarService.setStateAgenda('month');
        this.stateView = 'list';
      }
      this.stateAnim = true;
    }, 105);
  }
}
