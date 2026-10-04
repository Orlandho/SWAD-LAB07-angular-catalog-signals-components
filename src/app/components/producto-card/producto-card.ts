import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Producto } from '../../models/producto';
import { Resaltar } from '../../directives/resaltar';
import { StockCritico } from '../../directives/stock-critico';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [NgClass, CurrencyPipe, Resaltar, StockCritico, MatButtonModule],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.scss',
})
export class ProductoCard {
  // Input obligatorio: el padre DEBE proporcionar el producto
  readonly producto = input.required<Producto>();

  // Input opcional: indica si esta tarjeta es la seleccionada actualmente
  readonly seleccionado = input<boolean>(false);

  // Output: emite el producto hacia el componente padre cuando el usuario
  // pulsa el boton "Ver detalle"
  readonly seleccionar = output<Producto>();

  // Valor computado (signal derivado): se recalcula automaticamente
  // si el producto cambia
  readonly esStockBajo = computed(() => this.producto().stock < 5);

  alSeleccionar(): void {
    this.seleccionar.emit(this.producto());
  }
}
