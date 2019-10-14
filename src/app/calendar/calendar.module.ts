import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarService } from './services/calendar.service';
import { CalendarAgendaComponent } from './components/calendar-agenda/calendar-agenda.component';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { CalendarListItemComponent } from './components/calendar-list-item/calendar-list-item.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { CalendarDayItemComponent } from './components/calendar-day-item/calendar-day-item.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
];

@NgModule({
  declarations: [CalendarComponent, CalendarAgendaComponent, CalendarListComponent, CalendarListItemComponent, CalendarDayComponent, CalendarDayItemComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(ROUTES)],
  providers: [CalendarService]
})
export class CalendarModule {}
