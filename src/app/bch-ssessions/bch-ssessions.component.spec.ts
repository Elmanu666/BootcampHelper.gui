import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BchSsessionsComponent } from './bch-ssessions.component';

describe('BchSsessionsComponent', () => {
  let component: BchSsessionsComponent;
  let fixture: ComponentFixture<BchSsessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BchSsessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BchSsessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
