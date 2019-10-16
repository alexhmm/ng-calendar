import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppointmentView } from '../../models/appointment-view';
import { AppService } from 'src/app/shared/services/app/app.service';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-agenda',
  templateUrl: './calendar-agenda.component.html',
  styleUrls: ['./calendar-agenda.component.scss']
})
export class CalendarAgendaComponent implements OnInit {
  @Input() appointments: AppointmentView[];
  @Input() currentMonth: number;
  @Input() currentYear: number;
  @Input() date: number;

  activeDate: string;
  activeMonth: number;
  activeAppointmentDays: number[] = [];
  activeAppointmentPreviews: { day: number; appointments: string[] }[] = [];
  monthDays: number[];
  nextMonthDays: number[];
  ngUnsubscribe: Subject<object> = new Subject();
  prevMonthDays: number[];
  rowHeight = '40px';
  yearMonth: {
    year: number;
    month: number;
  };

  constructor(
    private appService: AppService,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.appService.stateHeight
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(innerHeight => {
        this.rowHeight = Math.floor((innerHeight - 57 - 48) / 6.5 / 2) + 'px';
      });
    this.calendarService.activeMonth
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activeMonth => {
        this.activeMonth = activeMonth;
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
    this.activeAppointmentDays = this.calendarService.getActiveAppointmentDays(
      this.appointments,
      this.yearMonth.year,
      this.yearMonth.month
    );
    this.activeAppointmentPreviews = this.calendarService.getActiveAppointmentPreviews(
      this.appointments,
      this.yearMonth.year,
      this.yearMonth.month
    );
  }

  findIndex(day: number): number {
    return this.activeAppointmentPreviews.findIndex(
      appointment => appointment.day === day
    );
  }

  openCalendarDay(day: number) {
    this.activeDate = this.calendarService.getISOStringByDate(
      this.yearMonth.year,
      this.yearMonth.month + 1,
      day + 1
    );
  }

  onCloseCalendarDay(event: string) {
    this.activeDate = event;
  }
}
