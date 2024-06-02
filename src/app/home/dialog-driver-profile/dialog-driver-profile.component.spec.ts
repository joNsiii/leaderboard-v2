import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDriverProfileComponent } from './dialog-driver-profile.component';

describe('DialogDriverProfileComponent', () => {
  let component: DialogDriverProfileComponent;
  let fixture: ComponentFixture<DialogDriverProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDriverProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDriverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
