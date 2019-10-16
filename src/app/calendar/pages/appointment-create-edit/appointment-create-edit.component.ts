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
  stateEdit: boolean;

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

  onGoBack(): void {
    this.router.navigate(['']);
  }

  onSubmit(): void {
    console.log('onSubmit', this.formGroup.value);
    this.router.navigate(['']);
  }
}
