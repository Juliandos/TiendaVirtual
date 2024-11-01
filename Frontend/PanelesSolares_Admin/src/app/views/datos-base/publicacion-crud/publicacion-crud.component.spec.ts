import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionCrudComponent } from './publicacion-crud.component';

describe('PublicacionCrudComponent', () => {
  let component: PublicacionCrudComponent;
  let fixture: ComponentFixture<PublicacionCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicacionCrudComponent]
    });
    fixture = TestBed.createComponent(PublicacionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
