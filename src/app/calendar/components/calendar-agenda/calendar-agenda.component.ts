import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Appointment } from '../../models/appointment';
import { AppService } from 'src/app/shared/services/app/app.service';
import { CalendarService } from '../../services/calendar.service';
import {
  modalEnter,
  modalEnterBackground,
  modalEnterContent
} from 'src/app/shared/services/animations/animations';

@Component({
  selector: 'app-calendar-agenda',
  templateUrl: './calendar-agenda.component.html',
  styleUrls: ['./calendar-agenda.component.scss'],
  animations: [modalEnter, modalEnterBackground, modalEnterContent]
})
export class CalendarAgendaComponent implements OnInit, OnDestroy {
  @Input() currentDay: number;
  @Input() currentMonth: number;
  @Input() currentYear: number;
  @Output() setMonthByClick = new EventEmitter<number>();

  activeAppointments: Appointment[];
  activeYear: number;
  dayStrings = this.calendarService.getDayStrings();
  monthDifference: number;
  monthStrings = this.calendarService.getMonthStrings();
  nextMonthLength: number;
  ngUnsubscribe: Subject<object> = new Subject();
  prevMonthDays: number[];
  selectedDate: string;
  selectedMonth: number;
  selectedMonthLength: number;
  selectedYear: number;
  stateAnim = false;
  stateScreen: string;
  stateView: string;
  viewMonthRowHeight = '40px';
  viewYearCols = 3;
  viewYearRowHeight = '80px';

  constructor(
    private appService: AppService,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Inits observable subscriptions
   */
  initSubscriptions(): void {
    this.appService.stateScreen
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(stateScreen => {
        this.stateScreen = stateScreen;
        if (this.stateScreen === 'xs') {
          this.viewYearCols = 2;
        } else {
          this.viewYearCols = 3;
        }
        if (
          this.stateScreen === 'md' ||
          this.stateScreen === 'lg' ||
          this.stateScreen === 'xl' ||
          this.stateScreen === 'fhd'
        ) {
          this.viewMonthRowHeight = '40px';
          this.viewYearRowHeight = '80px';
        } else {
          this.viewMonthRowHeight =
            Math.floor((innerHeight - 73 - 24 - 48) / 6.5 / 2) + 'px';
          this.viewYearRowHeight =
            Math.floor(innerHeight - 73 - 24 - 8 - 32) /
              (12 / this.viewYearCols) +
            'px';
        }
      });
    this.calendarService.activeYear
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(activeYear => {
        this.activeYear = activeYear;
      });
    this.calendarService.selectedYearMonth
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(selectedYearMonth => {
        this.selectedMonth = selectedYearMonth.month;
        this.selectedYear = selectedYearMonth.year;
      });
    this.calendarService.monthDifference
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.getMonthData();
      });

    this.calendarService.stateAgenda
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(stateAgenda => {
        this.stateView = stateAgenda;
      });
  }

  /**
   * Sets view data
   */
  getMonthData(): void {
    this.activeAppointments = this.calendarService.getActiveAppointments(
      this.selectedYear,
      this.selectedMonth
    );
    this.selectedMonthLength = this.calendarService.getMonthLength(
      this.monthDifference
    );
    this.prevMonthDays = this.calendarService.getPrevMonthDays(
      this.monthDifference
    );
    this.nextMonthLength = this.calendarService.getNextMonthLength(
      this.monthDifference
    );
  }

  /**
   * Returns number array of given month length
   * @param monthLength Month length
   */
  getMonthLength(monthLength: number): number[] {
    return new Array(monthLength);
  }

  /**
   * Returns appointment length of active day
   * @param activeDay Active day
   */
  getSelectedDayAppointmentLength(activeDay: number): number {
    return this.calendarService.getActiveDayAppointmentLength(
      this.activeAppointments,
      activeDay,
      this.selectedMonth,
      this.selectedYear
    );
  }

  getSelectedDayAppointmentFirst(activeDay: number): Appointment {
    const appointmentFirst = this.calendarService.getActiveDayAppointmentFirst(
      this.activeAppointments,
      activeDay,
      this.selectedMonth,
      this.selectedYear
    );
    return appointmentFirst;
  }

  /**
   * Open up CalendarDayComponent dialog
   * @param activeDay Active day
   */
  openCalendarDay(activeDay: number) {
    this.selectedDate = this.calendarService.getDateStringByNumbers(
      activeDay,
      this.selectedMonth,
      this.selectedYear
    );
    this.stateAnim = true;
  }

  /**
   * Closes CalendarDayComponent dialog
   */
  onCloseCalendarDay() {
    this.stateAnim = false;
    // Timeout for animation
    setTimeout(() => {
      this.selectedDate = null;
    }, 200);
  }

  /**
   * Handler for setting month view by click
   */
  onSetMonthByClick(month: number): void {
    this.setMonthByClick.emit(month);
  }
}
