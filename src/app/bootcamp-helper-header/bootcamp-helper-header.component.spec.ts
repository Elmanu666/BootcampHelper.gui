import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BootcampHelperHeaderComponent } from './bootcamp-helper-header.component';

describe('BootcampHelperHeaderComponent', () => {
  let component: BootcampHelperHeaderComponent;
  let fixture: ComponentFixture<BootcampHelperHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BootcampHelperHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootcampHelperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
