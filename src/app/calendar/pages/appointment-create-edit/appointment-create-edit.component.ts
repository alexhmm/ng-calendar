import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Appointment } from '../../models/appointment';
import { CalendarService } from '../../services/calendar.service';
import {
  modalEnter,
  modalEnterBackground,
  modalEnterContent
} from 'src/app/shared/services/animations/animations';

@Component({
  selector: 'app-appointment-create-edit',
  templateUrl: './appointment-create-edit.component.html',
  styleUrls: ['./appointment-create-edit.component.scss'],
  animations: [modalEnter, modalEnterBackground, modalEnterContent]
})
export class AppointmentCreateEditComponent implements OnInit, OnDestroy {
  appointment?: Appointment;
  dateEnd = new Date().toISOString();
  dateStart = new Date().toISOString();
  formGroup = new FormGroup({
    dateStart: new FormControl(
      moment(this.dateEnd).format('Do MMMM YYYY, LT'),
      [Validators.required]
    ),
    dateEnd: new FormControl(
      moment(this.dateStart).format('Do MMMM YYYY, LT'),
      [Validators.required]
    ),
    description: new FormControl(''),
    place: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required])
  });
  ngUnsubscribe: Subject<object> = new Subject();
  stateDate: string;
  stateEdit: boolean;
  statePick: string;
  stateAnim = false;

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
        this.dateEnd = this.appointment.dateEnd;
        this.dateStart = this.appointment.dateStart;
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Handler for opening date time picker
   * @param type Date type
   */
  onClickDateTimePicker(type: string): void {
    let monthDifference: number;
    if (type === 'dateStart') {
      this.stateDate = moment(this.dateStart).toISOString();
      monthDifference = this.calendarService.getMonthDifferenceByISOString(
        this.stateDate
      );
    } else {
      this.stateDate = this.dateEnd;
      monthDifference = this.calendarService.getMonthDifferenceByISOString(
        this.stateDate
      );
    }
    this.calendarService.setMonthDifference(monthDifference);
    this.calendarService.setDate(this.stateDate);
    this.statePick = type;
    this.stateAnim = true;
  }

  /**
   * Handler for closing date time picker
   */
  onCloseDateTimePicker(): void {
    this.stateAnim = false;
    setTimeout(() => {
      this.statePick = null;
    }, 200);
  }

  /**
   * Handler for date selection
   * @param event Select date event
   */
  onSetDate(event: { type: string; date: string }): void {
    if (event.type === 'dateStart') {
      this.dateStart = event.date;
      this.formGroup.patchValue({
        dateStart: moment(this.dateStart).format('Do MMMM YYYY, LT')
      });
    } else {
      this.dateEnd = event.date;
      this.formGroup.patchValue({
        dateEnd: moment(this.dateEnd).format('Do MMMM YYYY, LT')
      });
    }
    this.stateAnim = false;
    setTimeout(() => {
      this.statePick = null;
    }, 200);
  }

  /**
   * Navigates back to CalendarComponent
   */
  onGoBack(): void {
    this.router.navigate(['']);
  }

  /**
   * Submits appointment data
   */
  onSubmit(): void {
    this.formGroup.patchValue({
      dateEnd: this.dateEnd,
      dateStart: this.dateStart
    });
    console.log('onSubmit', this.formGroup.value);
    this.router.navigate(['']);
  }
}
