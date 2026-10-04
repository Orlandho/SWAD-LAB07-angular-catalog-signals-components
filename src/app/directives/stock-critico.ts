import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[appStockCritico]',
  standalone: true,
  host: {
    '[style.border-left]': 'bordeLeft()',
  },
})
export class StockCritico {
  // Input obligatorio con alias para enlazarse directamente: [appStockCritico]="producto().stock"
  readonly stock = input.required<number>({ alias: 'appStockCritico' });

  // Input opcional con umbral de evaluacion (por defecto 5)
  readonly umbral = input<number>(5, { alias: 'umbral' });

  // Expresion reactiva que asigna el borde izquierdo de 6px rojo si el stock es menor al umbral
  readonly bordeLeft = computed(() =>
    this.stock() < this.umbral() ? '6px solid #dc3545' : null
  );
}
