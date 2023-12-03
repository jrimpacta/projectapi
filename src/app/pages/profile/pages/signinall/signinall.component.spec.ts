import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninallComponent } from './signinall.component';

describe('SigninallComponent', () => {
  let component: SigninallComponent;
  let fixture: ComponentFixture<SigninallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
