import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PRODUCTOS_MOCK } from './data/productos-mock';

describe('App Component (Project 2 - Lab 07)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('debe crear el componente raiz correctamente', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debe inicializar totalProductos con la longitud de PRODUCTOS_MOCK', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.totalProductos).toBe(PRODUCTOS_MOCK.length);
  });

  it('debe calcular reactivamente totalStockBajo para productos con stock < 5', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const esperados = PRODUCTOS_MOCK.filter(p => p.stock < 5).length;
    expect(app.totalStockBajo()).toBe(esperados);
  });

  it('debe renderizar los componentes encabezado y catalogo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-encabezado')).toBeTruthy();
    expect(compiled.querySelector('app-catalogo')).toBeTruthy();
  });
});
