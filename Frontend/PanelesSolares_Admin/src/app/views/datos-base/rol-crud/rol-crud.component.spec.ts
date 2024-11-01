import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolCrudComponent } from './rol-crud.component';

describe('RolCrudComponent', () => {
  let component: RolCrudComponent;
  let fixture: ComponentFixture<RolCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolCrudComponent]
    });
    fixture = TestBed.createComponent(RolCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
