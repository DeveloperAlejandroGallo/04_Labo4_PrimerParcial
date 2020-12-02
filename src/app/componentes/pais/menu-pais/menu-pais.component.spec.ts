import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPaisComponent } from './menu-pais.component';

describe('MenuPaisComponent', () => {
  let component: MenuPaisComponent;
  let fixture: ComponentFixture<MenuPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
