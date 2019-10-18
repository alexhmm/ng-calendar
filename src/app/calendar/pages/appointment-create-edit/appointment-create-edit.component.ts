import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Appointment } from '../../models/appointment';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-appointment-create-edit',
  templateUrl: './appointment-create-edit.component.html',
  styleUrls: ['./appointment-create-edit.component.scss']
})
export class AppointmentCreateEditComponent implements OnInit {
  appointment?: Appointment;
  date: string;
  formGroup = new FormGroup({
    dateStart: new FormControl(moment(new Date()).format('Do MMMM YYYY, LT'), [
      Validators.required
    ]),
    dateEnd: new FormControl(moment(new Date()).format('Do MMMM YYYY, LT'), [
      Validators.required
    ]),
    description: new FormControl(''),
    place: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required])
  });
  ngUnsubscribe: Subject<object> = new Subject();
  stateDate: string;
  stateEdit: boolean;
  statePick: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      const appointmentId = params.appointmentId;
      if (appointmentId) {
        this.appointment = this.calendarService.getAppointmentById(
          appointmentId
        );
        this.formGroup.patchValue({
          dateEnd: moment(this.appointment.dateEnd).format('Do MMMM YYYY, LT'),
          dateStart: moment(this.appointment.dateStart).format(
            'Do MMMM YYYY, LT'
          ),
          description: this.appointment.desc,
          place: this.appointment.place,
          title: this.appointment.title
        });
      }
    });
  }

  /**
   * Handler for opening date time picker
   * @param type Date type
   */
  onClickDateTimePicker(type: string): void {
    this.statePick = type;
    let monthDifference: number;
    if (!this.appointment && type === 'dateStart') {
      this.stateDate = new Date().toISOString();
      monthDifference = this.calendarService.getMonthDifference(this.stateDate);
    } else if (!this.appointment && type === 'dateEnd') {
      this.stateDate = new Date().toISOString();
      monthDifference = this.calendarService.getMonthDifference(this.stateDate);
    } else if (this.appointment && type === 'dateStart') {
      this.stateDate = this.appointment.dateStart;
      monthDifference = this.calendarService.getMonthDifference(this.stateDate);
    } else if (this.appointment && type === 'dateEnd') {
      this.stateDate = this.appointment.dateEnd;
      monthDifference = this.calendarService.getMonthDifference(this.stateDate);
    }
    this.calendarService.setMonthDifference(monthDifference);
  }

  /**
   * Handler for closing date time picker
   */
  onCloseDateTimePicker(): void {
    this.statePick = null;
  }

  /**
   * Handler for date selection
   * @param event Select date event
   */
  onSelectDate(event: { type: string; date: string }): void {
    if (event.type === 'dateStart') {
      this.formGroup.patchValue({
        dateStart: moment(event.date).format('Do MMMM YYYY, LT')
      });
    } else {
      this.formGroup.patchValue({
        dateEnd: moment(event.date).format('Do MMMM YYYY, LT')
      });
    }
    this.statePick = null;
  }

  onGoBack(): void {
    this.router.navigate(['']);
  }

  onSubmit(): void {
    console.log('onSubmit', this.formGroup.value);
    this.router.navigate(['']);
  }
}
