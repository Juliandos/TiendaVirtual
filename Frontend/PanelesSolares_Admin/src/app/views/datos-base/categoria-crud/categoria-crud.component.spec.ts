import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardModule, GridModule, TableModule, UtilitiesModule } from '@coreui/angular';
import { CategoriaCRUDComponent } from './categoria-crud.component';

describe('CategoriaCRUDComponent', () => {
  let component: CategoriaCRUDComponent;
  let fixture: ComponentFixture<CategoriaCRUDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaCRUDComponent],
      // imports: [ TableModule ]
    });
    fixture = TestBed.createComponent(CategoriaCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
