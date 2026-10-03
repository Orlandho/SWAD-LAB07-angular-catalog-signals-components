import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-resumen-inventario',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './resumen-inventario.html',
  styleUrl: './resumen-inventario.scss',
})
export class ResumenInventario {
  // Recibe la lista filtrada de productos (Paso A3)
  readonly productos = input.required<Producto[]>();

  // Calculo reactivo del valor total del inventario visible (precio * stock)
  readonly valorTotal = computed(() =>
    this.productos().reduce((total, p) => total + (p.precio * p.stock), 0)
  );

  // Total de unidades fisicas disponibles
  readonly unidadesTotales = computed(() =>
    this.productos().reduce((total, p) => total + p.stock, 0)
  );
}
