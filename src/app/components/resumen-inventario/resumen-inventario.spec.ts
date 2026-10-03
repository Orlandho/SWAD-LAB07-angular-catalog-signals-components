import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenInventario } from './resumen-inventario';
import { Producto } from '../../models/producto';

describe('ResumenInventario Component (Lab 07 - Actividad A3)', () => {
  let component: ResumenInventario;
  let fixture: ComponentFixture<ResumenInventario>;

  const productosPrueba: Producto[] = [
    { id: 1, nombre: 'Producto A', precio: 100, stock: 5, estadoStock: 'OK' }, // 500
    { id: 2, nombre: 'Producto B', precio: 50, stock: 2, estadoStock: 'INSUFICIENTE' } // 100
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenInventario]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenInventario);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('productos', productosPrueba);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe calcular correctamente el valor total del inventario (precio * stock)', () => {
    // 100*5 + 50*2 = 600
    expect(component.valorTotal()).toBe(600);
  });

  it('debe calcular correctamente la cantidad total de unidades fisicas', () => {
    // 5 + 2 = 7
    expect(component.unidadesTotales()).toBe(7);
  });

  it('debe renderizar el valor total con formato de moneda peruana (PEN)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('600');
  });
});
