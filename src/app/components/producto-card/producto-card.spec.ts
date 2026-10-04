import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoCard } from './producto-card';
import { Producto } from '../../models/producto';

describe('ProductoCard Component (Lab 07)', () => {
  let fixture: ComponentFixture<ProductoCard>;
  let component: ProductoCard;

  const mockProductoOk: Producto = {
    id: 1,
    nombre: 'Teclado Mecánico RGB',
    precio: 189.9,
    stock: 15,
    estadoStock: 'OK',
  };

  const mockProductoBajo: Producto = {
    id: 2,
    nombre: 'Mouse Inalámbrico',
    precio: 75.5,
    stock: 3,
    estadoStock: 'INSUFICIENTE',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoCard);
    component = fixture.componentInstance;
  });

  it('debe crearse y renderizar datos del producto con stock normal', () => {
    fixture.componentRef.setInput('producto', mockProductoOk);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.tarjeta__titulo')?.textContent).toContain('Teclado Mecánico RGB');
    expect(el.querySelector('.badge-stock--ok')?.textContent).toContain('OK');
    expect(component.esStockBajo()).toBe(false);
    expect(el.querySelector('.tarjeta__aviso')).toBeNull();
  });

  it('debe calcular esStockBajo como true y mostrar aviso cuando el stock es menor a 5', () => {
    fixture.componentRef.setInput('producto', mockProductoBajo);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(component.esStockBajo()).toBe(true);
    expect(el.querySelector('.tarjeta__aviso')?.textContent).toContain('Pocas unidades disponibles');
    expect(el.querySelector('.badge-stock--insuficiente')?.textContent).toContain('INSUFICIENTE');
  });

  it('debe emitir el evento seleccionar al pulsar el botón Ver detalle', () => {
    fixture.componentRef.setInput('producto', mockProductoOk);
    fixture.detectChanges();

    let seleccionadoEmitido: Producto | undefined;
    component.seleccionar.subscribe(p => (seleccionadoEmitido = p));

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    boton.click();

    expect(seleccionadoEmitido).toEqual(mockProductoOk);
  });

  it('debe aplicar la directiva appStockCritico con borde rojo en productos de stock bajo', () => {
    fixture.componentRef.setInput('producto', mockProductoBajo);
    fixture.detectChanges();

    const article = fixture.nativeElement.querySelector('article') as HTMLElement;
    expect(article.style.borderLeft).toContain('6px solid');
  });
});
