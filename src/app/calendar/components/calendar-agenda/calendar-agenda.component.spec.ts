import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAgendaComponent } from './calendar-agenda.component';

describe('CalendarAgendaComponent', () => {
  let component: CalendarAgendaComponent;
  let fixture: ComponentFixture<CalendarAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
