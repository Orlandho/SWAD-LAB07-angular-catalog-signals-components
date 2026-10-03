import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Catalogo } from './catalogo';
import { PRODUCTOS_MOCK } from '../../data/productos-mock';

describe('Catalogo Component (Lab 07)', () => {
  let component: Catalogo;
  let fixture: ComponentFixture<Catalogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalogo],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar la lista completa de productos desde el mock inicialmente', () => {
    expect(component.productos().length).toBe(PRODUCTOS_MOCK.length);
    expect(component.productosFiltrados().length).toBe(PRODUCTOS_MOCK.length);
  });

  it('debe filtrar productos por coincidencia de texto mediante el signal derivado', () => {
    component.buscar('Teclado');
    fixture.detectChanges();

    expect(component.productosFiltrados().length).toBe(1);
    expect(component.productosFiltrados()[0].nombre).toContain('Teclado mecánico');
  });

  it('debe alternar el filtro de solo stock bajo con el signal booleano (Actividad A1)', () => {
    expect(component.soloStockBajo()).toBe(false);

    component.toggleSoloStockBajo();
    fixture.detectChanges();

    expect(component.soloStockBajo()).toBe(true);
    const todosBajos = component.productosFiltrados().every(p => p.stock < 5);
    expect(todosBajos).toBe(true);
  });

  it('debe abrir y cerrar el panel de detalle correctamente', () => {
    expect(component.seleccionado()).toBeNull();

    const productoPrueba = PRODUCTOS_MOCK[0];
    component.mostrarDetalle(productoPrueba);
    fixture.detectChanges();

    expect(component.seleccionado()).toEqual(productoPrueba);

    component.cerrarDetalle();
    fixture.detectChanges();

    expect(component.seleccionado()).toBeNull();
  });
});
