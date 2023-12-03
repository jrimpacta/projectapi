import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButttonProvidersComponent } from './buttton-providers.component';

describe('ButttonProvidersComponent', () => {
  let component: ButttonProvidersComponent;
  let fixture: ComponentFixture<ButttonProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButttonProvidersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButttonProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
