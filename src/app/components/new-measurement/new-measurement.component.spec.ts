import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeasurementComponent } from './new-measurement.component';

describe('NewMeasurementComponent', () => {
  let component: NewMeasurementComponent;
  let fixture: ComponentFixture<NewMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMeasurementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
