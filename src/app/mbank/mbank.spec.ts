import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mbank } from './mbank';

describe('Mbank', () => {
  let component: Mbank;
  let fixture: ComponentFixture<Mbank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mbank],
    }).compileComponents();

    fixture = TestBed.createComponent(Mbank);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
