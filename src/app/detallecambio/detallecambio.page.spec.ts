import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecambioPage } from './detallecambio.page';

describe('DetallecambioPage', () => {
  let component: DetallecambioPage;
  let fixture: ComponentFixture<DetallecambioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallecambioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallecambioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
