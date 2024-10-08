import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrumDetailsComponent } from './spectrum-details.component';

describe('SpectrumDetailsComponent', () => {
  let component: SpectrumDetailsComponent;
  let fixture: ComponentFixture<SpectrumDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpectrumDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpectrumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
