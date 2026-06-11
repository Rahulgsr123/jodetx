import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login3 } from './login3';

describe('Login3', () => {
  let component: Login3;
  let fixture: ComponentFixture<Login3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login3],
    }).compileComponents();

    fixture = TestBed.createComponent(Login3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
