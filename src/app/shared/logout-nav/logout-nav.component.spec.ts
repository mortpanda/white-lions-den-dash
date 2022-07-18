import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutNavComponent } from './logout-nav.component';

describe('LogoutNavComponent', () => {
  let component: LogoutNavComponent;
  let fixture: ComponentFixture<LogoutNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
