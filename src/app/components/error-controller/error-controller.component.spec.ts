import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorControllerComponent } from './error-controller.component';

describe('ErrorControllerComponent', () => {
  let component: ErrorControllerComponent;
  let fixture: ComponentFixture<ErrorControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
