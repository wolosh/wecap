import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosModulosComponent } from './cursos-modulos.component';

describe('CursosModulosComponent', () => {
  let component: CursosModulosComponent;
  let fixture: ComponentFixture<CursosModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosModulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
