import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockCritico } from './stock-critico';

@Component({
  standalone: true,
  imports: [StockCritico],
  template: `
    <div id="test-elem" [appStockCritico]="stock" [umbral]="umbral">Caja de prueba</div>
  `,
})
class TestHostComponent {
  stock = 10;
  umbral = 5;
}

describe('StockCritico Directive (Lab 07 Reto)', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('#test-elem');
  });

  it('no debe aplicar borde cuando el stock es igual o mayor al umbral', () => {
    hostComponent.stock = 15;
    hostComponent.umbral = 5;
    fixture.detectChanges();

    expect(element.style.borderLeft).toBe('');
  });

  it('debe aplicar borde izquierdo rojo cuando el stock es menor al umbral predeterminado (5)', () => {
    hostComponent.stock = 2;
    hostComponent.umbral = 5;
    fixture.detectChanges();

    expect(element.style.borderLeft).toContain('6px solid');
  });

  it('debe aplicar borde cuando se personaliza el umbral a 10 y el stock es 8', () => {
    hostComponent.stock = 8;
    hostComponent.umbral = 10;
    fixture.detectChanges();

    expect(element.style.borderLeft).toContain('6px solid');
  });

  it('no debe aplicar borde cuando se personaliza el umbral a 10 y el stock es 12', () => {
    hostComponent.stock = 12;
    hostComponent.umbral = 10;
    fixture.detectChanges();

    expect(element.style.borderLeft).toBe('');
  });
});
