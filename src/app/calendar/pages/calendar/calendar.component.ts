import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class CalendarComponent implements OnInit, OnDestroy {
  appointments: { appointments: Appointment[] };
  appointments$ = of(this.calendarService.getAppointments());
  activeYear: number;
  currentDay = moment().date();
  currentMonth = this.calendarService.getCurrentMonth();
  currentYear = this.calendarService.getCurrentYear();
  monthDifference: number;
  monthText: string;
  ngUnsubscribe: Subject<object> = new Subject();
  selectedMonth: number;
  selectedYear: number;
  stateAnim = false;
  stateCreateEdit = false;
  stateAgenda: string;
  stateView = 'agenda';

  constructor(
    private router: Router,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.initSubscriptions();
    this.stateAnim = true;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Inits observable subscriptions
   */
  initSubscriptions(): void {
    this.calendarService.activeYear
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activeYear => (this.activeYear = activeYear));
    this.calendarService.stateAgenda
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(stateAgenda => {
        this.stateAgenda = stateAgenda;
      });
    this.calendarService.selectedYearMonth
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(selectedYearMonth => {
        this.selectedMonth = selectedYearMonth.month;
        this.selectedYear = selectedYearMonth.year;
      });
    this.calendarService.monthDifference
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.getMonthData();
      });
    this.appointments$.subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  /**
   * Sets view data
   */
  getMonthData(): void {
    this.monthText = this.calendarService.getMonthText(this.selectedMonth);
  }

  /**
   * Handler for setting next month
   */
  nextMonth(): void {
    this.stateAnim = false;
    setTimeout(() => {
      this.calendarService.setActiveYear(
        this.calendarService.getYearByMonthDifference(this.monthDifference + 1)
      );
      this.calendarService.setSelectedYearMonth(this.monthDifference + 1);
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
      this.calendarService.setActiveYear(this.activeYear + 1);
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
    this.calendarService.setSelectedYearMonth(monthDifference);
    this.calendarService.setMonthDifference(monthDifference);
    this.setStateAgenda('month');
  }

  /**
   * Handler for setting previous month
   */
  prevMonth(): void {
    this.stateAnim = false;
    setTimeout(() => {
      this.calendarService.setActiveYear(
        this.calendarService.getYearByMonthDifference(this.monthDifference - 1)
      );
      this.calendarService.setSelectedYearMonth(this.monthDifference - 1);
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
      this.calendarService.setActiveYear(this.activeYear - 1);
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
      if (state === 'year') {
        this.calendarService.setActiveYear(this.selectedYear);
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
