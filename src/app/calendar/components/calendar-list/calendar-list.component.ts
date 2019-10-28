import { Component, OnInit, Input } from '@angular/core';

import { Appointment } from '../../models/appointment';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  @Input() currentDay: number;
  @Input() currentMonth: number;
  @Input() currentYear: number;

  activeAppointments: Appointment[] = [];
  monthDifference: number;

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.monthDifference.subscribe(monthDifference => {
      this.monthDifference = monthDifference;
      this.getMonthData();
    });
  }

  getMonthData(): void {
    this.activeAppointments = this.calendarService.getActiveAppointments(
      this.calendarService.getYearByMonthDifference(this.monthDifference),
      this.calendarService.getMonthByMonthDifference(this.monthDifference)
    );
  }
}
