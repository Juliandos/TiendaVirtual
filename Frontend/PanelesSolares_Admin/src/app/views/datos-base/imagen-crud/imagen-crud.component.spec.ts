import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenCrudComponent } from './imagen-crud.component';

describe('ImagenCrudComponent', () => {
  let component: ImagenCrudComponent;
  let fixture: ComponentFixture<ImagenCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagenCrudComponent]
    });
    fixture = TestBed.createComponent(ImagenCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
