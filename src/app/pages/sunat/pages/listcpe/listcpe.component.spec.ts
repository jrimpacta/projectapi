import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcpeComponent } from './listcpe.component';

describe('ListcpeComponent', () => {
  let component: ListcpeComponent;
  let fixture: ComponentFixture<ListcpeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListcpeComponent]
    });
    fixture = TestBed.createComponent(ListcpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
