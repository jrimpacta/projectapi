import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninimpactaComponent } from './signinimpacta.component';

describe('SigninimpactaComponent', () => {
  let component: SigninimpactaComponent;
  let fixture: ComponentFixture<SigninimpactaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninimpactaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninimpactaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
