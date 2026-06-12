import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jodetx } from './jodetx';

describe('Jodetx', () => {
  let component: Jodetx;
  let fixture: ComponentFixture<Jodetx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jodetx],
    }).compileComponents();

    fixture = TestBed.createComponent(Jodetx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
