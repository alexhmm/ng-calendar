import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-agenda',
  templateUrl: './calendar-agenda.component.html',
  styleUrls: ['./calendar-agenda.component.scss']
})
export class CalendarAgendaComponent implements OnInit {
  @Input() appointments: any[];
  @Input() currentMonth: number;
  @Input() currentYear: number;
  @Input() date: number;
  @Input() yearMonth: {
    year: number;
    month: number;
  };

  activeMonth: number;
  activeAppointmentDays: number[] = [];
  monthDays: number[];
  nextMonthDays: number[];
  prevMonthDays: number[];

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
  }
}
