import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDComponent } from './navbar-d.component';

describe('NavbarDComponent', () => {
  let component: NavbarDComponent;
  let fixture: ComponentFixture<NavbarDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarDComponent]
    });
    fixture = TestBed.createComponent(NavbarDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
