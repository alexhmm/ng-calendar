import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayItemComponent } from './calendar-day-item.component';

describe('CalendarDayItemComponent', () => {
  let component: CalendarDayItemComponent;
  let fixture: ComponentFixture<CalendarDayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
