import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloCrudComponent } from './modulo-crud.component';

describe('ModuloCrudComponent', () => {
  let component: ModuloCrudComponent;
  let fixture: ComponentFixture<ModuloCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloCrudComponent]
    });
    fixture = TestBed.createComponent(ModuloCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
