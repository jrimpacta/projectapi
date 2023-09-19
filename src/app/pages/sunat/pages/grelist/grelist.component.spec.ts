import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrelistComponent } from './grelist.component';

describe('GrelistComponent', () => {
  let component: GrelistComponent;
  let fixture: ComponentFixture<GrelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrelistComponent]
    });
    fixture = TestBed.createComponent(GrelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
