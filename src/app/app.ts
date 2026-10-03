import { Component, computed } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';
import { Catalogo } from './components/catalogo/catalogo';
import { PRODUCTOS_MOCK } from './data/productos-mock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Encabezado, Catalogo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Cantidad total de productos disponibles en el mock
  readonly totalProductos = PRODUCTOS_MOCK.length;

  // Actividad Autonoma A2: calcula productos con stock menor que 5
  readonly totalStockBajo = computed(() =>
    PRODUCTOS_MOCK.filter(p => p.stock < 5).length
  );
}
