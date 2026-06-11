import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login6 } from './login6';

describe('Login6', () => {
  let component: Login6;
  let fixture: ComponentFixture<Login6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login6],
    }).compileComponents();

    fixture = TestBed.createComponent(Login6);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
