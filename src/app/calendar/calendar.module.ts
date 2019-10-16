import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentCreateEditComponent } from './pages/appointment-create-edit/appointment-create-edit.component';

import { CalendarAgendaComponent } from './components/calendar-agenda/calendar-agenda.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { CalendarDayItemComponent } from './components/calendar-day-item/calendar-day-item.component';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { CalendarListItemComponent } from './components/calendar-list-item/calendar-list-item.component';

import { CalendarService } from './services/calendar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatetimePickerComponent } from './components/datetime-picker/datetime-picker.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: CalendarComponent
  },
  {
    path: 'create',
    component: AppointmentCreateEditComponent
  },
  {
    path: 'edit/:appointmentId',
    component: AppointmentCreateEditComponent
  }
];

@NgModule({
  declarations: [
    AppointmentCreateEditComponent,
    CalendarAgendaComponent,
    CalendarComponent,
    CalendarDayComponent,
    CalendarDayItemComponent,
    CalendarListComponent,
    CalendarListItemComponent,
    DatetimePickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [CalendarService]
})
export class CalendarModule {}
