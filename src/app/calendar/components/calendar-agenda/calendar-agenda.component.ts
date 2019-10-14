import { Component, OnInit, Input } from '@angular/core';

import { AppointmentView } from '../../models/appointment-view';
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
  prevMonthDays: number[];
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
    console.log('activeAppointmentPreviews', this.activeAppointmentPreviews);
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
