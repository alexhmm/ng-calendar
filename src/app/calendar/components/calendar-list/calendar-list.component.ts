import { Component, OnInit, Input } from '@angular/core';

import { Appointment } from '../../models/appointment';
import { AppointmentView } from '../../models/appointment-view';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  @Input() appointments: Appointment[];
  @Input() currentMonth: number;
  @Input() currentYear: number;
  @Input() date: number;

  activeAppointments: AppointmentView[] = [];
  activeMonth: number;
  yearMonth: {
    year: number;
    month: number;
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.activeMonth.subscribe(activeMonth => {
      this.activeMonth = activeMonth;
      this.getMonthData();
    });
  }

  getMonthData(): void {
    this.yearMonth = this.calendarService.getYearMonth(this.activeMonth);
    this.activeAppointments = this.calendarService.getActiveAppointments(
      this.appointments,
      this.yearMonth.year,
      this.yearMonth.month
    );
  }
}
