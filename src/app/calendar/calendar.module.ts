import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarService } from './services/calendar.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
];

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(ROUTES)],
  providers: [CalendarService]
})
export class CalendarModule {}
