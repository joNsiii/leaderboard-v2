import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddClipComponent } from './dialog-add-clip.component';

describe('DialogAddClipComponent', () => {
  let component: DialogAddClipComponent;
  let fixture: ComponentFixture<DialogAddClipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddClipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
