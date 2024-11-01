import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaRolCrudComponent } from './persona-rol-crud.component';

describe('PersonaRolCrudComponent', () => {
  let component: PersonaRolCrudComponent;
  let fixture: ComponentFixture<PersonaRolCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaRolCrudComponent]
    });
    fixture = TestBed.createComponent(PersonaRolCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
