import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectraGridComponent } from './spectra-grid.component';

describe('SpectraGridComponent', () => {
  let component: SpectraGridComponent;
  let fixture: ComponentFixture<SpectraGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpectraGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpectraGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
