import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisPeliculaComponent } from './pais-pelicula.component';

describe('PaisPeliculaComponent', () => {
  let component: PaisPeliculaComponent;
  let fixture: ComponentFixture<PaisPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaisPeliculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
