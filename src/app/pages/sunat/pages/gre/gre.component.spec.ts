import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreComponent } from './gre.component';

describe('GreComponent', () => {
  let component: GreComponent;
  let fixture: ComponentFixture<GreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreComponent]
    });
    fixture = TestBed.createComponent(GreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
