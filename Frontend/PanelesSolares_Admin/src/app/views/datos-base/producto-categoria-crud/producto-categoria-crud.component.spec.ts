import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCategoriaCrudComponent } from './producto-categoria-crud.component';

describe('ProductoCategoriaCrudComponent', () => {
  let component: ProductoCategoriaCrudComponent;
  let fixture: ComponentFixture<ProductoCategoriaCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoCategoriaCrudComponent]
    });
    fixture = TestBed.createComponent(ProductoCategoriaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
