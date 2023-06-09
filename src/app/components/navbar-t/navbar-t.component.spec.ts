import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTComponent } from './navbar-t.component';

describe('NavbarTComponent', () => {
  let component: NavbarTComponent;
  let fixture: ComponentFixture<NavbarTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarTComponent]
    });
    fixture = TestBed.createComponent(NavbarTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
