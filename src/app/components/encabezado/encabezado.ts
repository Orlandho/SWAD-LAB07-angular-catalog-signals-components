import { Component, input } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.scss',
})
export class Encabezado {
  // Input obligatorio: el padre DEBE proporcionar un titulo
  readonly titulo = input.required<string>();

  // Input con valor por defecto
  readonly totalProductos = input<number>(0);

  // Requisito Actividad Autonoma A2: Indicador de stock bajo
  readonly totalStockBajo = input<number>(0);
}
