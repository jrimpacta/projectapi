import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnErrorComponent } from './btn-error.component';

describe('BtnErrorComponent', () => {
  let component: BtnErrorComponent;
  let fixture: ComponentFixture<BtnErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnErrorComponent]
    });
    fixture = TestBed.createComponent(BtnErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
