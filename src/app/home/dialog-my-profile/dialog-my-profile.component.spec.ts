import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMyProfileComponent } from './dialog-my-profile.component';

describe('DialogMyProfileComponent', () => {
  let component: DialogMyProfileComponent;
  let fixture: ComponentFixture<DialogMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
