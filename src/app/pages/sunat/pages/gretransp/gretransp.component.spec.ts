import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GretranspComponent } from './gretransp.component';

describe('GretranspComponent', () => {
  let component: GretranspComponent;
  let fixture: ComponentFixture<GretranspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GretranspComponent]
    });
    fixture = TestBed.createComponent(GretranspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
