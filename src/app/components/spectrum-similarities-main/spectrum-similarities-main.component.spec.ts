import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrumSimilaritiesMainComponent } from './spectrum-similarities-main.component';

describe('SpectrumSimilaritiesMainComponent', () => {
  let component: SpectrumSimilaritiesMainComponent;
  let fixture: ComponentFixture<SpectrumSimilaritiesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpectrumSimilaritiesMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpectrumSimilaritiesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
