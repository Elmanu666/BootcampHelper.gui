import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampHelperHeaderComponent } from './bootcamp-helper-header.component';

describe('BootcampHelperHeaderComponent', () => {
  let component: BootcampHelperHeaderComponent;
  let fixture: ComponentFixture<BootcampHelperHeaderComponent>;

  beforeEach(async(() => {
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
