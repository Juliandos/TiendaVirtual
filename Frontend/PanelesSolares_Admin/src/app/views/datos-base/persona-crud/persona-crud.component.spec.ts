import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaCrudComponent } from './persona-crud.component';

describe('PersonaCrudComponent', () => {
  let component: PersonaCrudComponent;
  let fixture: ComponentFixture<PersonaCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaCrudComponent]
    });
    fixture = TestBed.createComponent(PersonaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
