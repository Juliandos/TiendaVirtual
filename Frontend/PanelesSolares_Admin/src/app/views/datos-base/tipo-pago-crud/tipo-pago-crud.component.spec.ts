import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagoCrudComponent } from './tipo-pago-crud.component';

describe('TipoPagoCrudComponent', () => {
  let component: TipoPagoCrudComponent;
  let fixture: ComponentFixture<TipoPagoCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoPagoCrudComponent]
    });
    fixture = TestBed.createComponent(TipoPagoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
