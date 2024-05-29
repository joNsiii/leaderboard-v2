import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDriverComponent } from './dialog-add-driver.component';

describe('DialogAddDriverComponent', () => {
  let component: DialogAddDriverComponent;
  let fixture: ComponentFixture<DialogAddDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddDriverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
