import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDisplayComponent } from './session-display.component';

describe('SessionDisplayComponent', () => {
  let component: SessionDisplayComponent;
  let fixture: ComponentFixture<SessionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
