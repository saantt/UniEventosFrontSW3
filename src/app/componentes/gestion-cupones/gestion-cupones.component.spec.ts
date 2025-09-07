import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCuponesComponent } from './gestion-cupones.component';

describe('GestionCuponesComponent', () => {
  let component: GestionCuponesComponent;
  let fixture: ComponentFixture<GestionCuponesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCuponesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
