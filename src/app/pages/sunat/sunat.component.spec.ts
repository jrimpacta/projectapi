import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunatComponent } from './sunat.component';

describe('SunatComponent', () => {
  let component: SunatComponent;
  let fixture: ComponentFixture<SunatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SunatComponent]
    });
    fixture = TestBed.createComponent(SunatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
