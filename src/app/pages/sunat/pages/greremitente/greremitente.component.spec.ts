import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreremitenteComponent } from './greremitente.component';

describe('GreremitenteComponent', () => {
  let component: GreremitenteComponent;
  let fixture: ComponentFixture<GreremitenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreremitenteComponent]
    });
    fixture = TestBed.createComponent(GreremitenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
