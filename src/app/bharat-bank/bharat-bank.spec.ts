import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BharatBank } from './bharat-bank';

describe('BharatBank', () => {
  let component: BharatBank;
  let fixture: ComponentFixture<BharatBank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BharatBank],
    }).compileComponents();

    fixture = TestBed.createComponent(BharatBank);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
