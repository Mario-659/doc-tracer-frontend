import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringDevicesMainComponent } from './measuring-devices-main.component';

describe('SampleDevicesMainComponent', () => {
  let component: MeasuringDevicesMainComponent;
  let fixture: ComponentFixture<MeasuringDevicesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuringDevicesMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuringDevicesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
