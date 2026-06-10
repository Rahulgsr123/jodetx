import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReporting } from './create-reporting';

describe('CreateReporting', () => {
  let component: CreateReporting;
  let fixture: ComponentFixture<CreateReporting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReporting],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReporting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
