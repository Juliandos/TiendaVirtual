import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoCRUDComponent } from './contacto-crud.component';

describe('ContactoCRUDComponent', () => {
  let component: ContactoCRUDComponent;
  let fixture: ComponentFixture<ContactoCRUDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoCRUDComponent]
    });
    fixture = TestBed.createComponent(ContactoCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
