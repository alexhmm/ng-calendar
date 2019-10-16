import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCreateEditComponent } from './appointment-create-edit.component';

describe('AppointmentCreateEditComponent', () => {
  let component: AppointmentCreateEditComponent;
  let fixture: ComponentFixture<AppointmentCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentCreateEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
