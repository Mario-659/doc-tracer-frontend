import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeasurementComponent } from './edit-measurement.component';

describe('EditMeasurementComponent', () => {
  let component: EditMeasurementComponent;
  let fixture: ComponentFixture<EditMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMeasurementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
