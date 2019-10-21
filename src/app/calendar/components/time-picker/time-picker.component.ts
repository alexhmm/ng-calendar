import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  @Input() selectedTime: string;
  @Output() selectTime = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
