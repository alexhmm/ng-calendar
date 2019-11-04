import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Appointment } from '../../models/appointment';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit, OnDestroy {
  @Input() currentDay: number;
  @Input() currentMonth: number;
  @Input() currentYear: number;

  activeAppointments: Appointment[] = [];
  monthDifference: number;
  ngUnsubscribe: Subject<object> = new Subject();

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.monthDifference
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(monthDifference => {
        this.monthDifference = monthDifference;
        this.getMonthData();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getMonthData(): void {
    this.activeAppointments = this.calendarService.getActiveAppointments(
      this.calendarService.getYearByMonthDifference(this.monthDifference),
      this.calendarService.getMonthByMonthDifference(this.monthDifference)
    );
  }
}
