import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {
  @Input() type: string;
  @Output() closeDateTimePicker = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onCloseDateTimePicker(): void {
    this.closeDateTimePicker.emit();
  }
}
