import { Component, computed, signal } from '@angular/core';
import { Producto } from '../../models/producto';
import { PRODUCTOS_MOCK } from '../../data/productos-mock';
import { ProductoCard } from '../producto-card/producto-card';
import { DetalleProducto } from '../detalle-producto/detalle-producto';
import { ResumenInventario } from '../resumen-inventario/resumen-inventario';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductoCard, DetalleProducto, ResumenInventario],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  // Estado del componente con signals
  readonly productos = signal<Producto[]>(PRODUCTOS_MOCK);
  readonly filtro = signal('');
  readonly seleccionado = signal<Producto | null>(null);

  // Actividad Autonoma A1: signal booleano para filtro de stock insuficiente
  readonly soloStockBajo = signal(false);

  // Lista derivada: se recalcula sola cuando cambia el filtro, soloStockBajo o los productos
  readonly productosFiltrados = computed(() => {
    const texto = this.filtro().trim().toLowerCase();
    const soloBajo = this.soloStockBajo();

    return this.productos().filter((p) => {
      const coincideTexto = p.nombre.toLowerCase().includes(texto);
      const coincideStock = !soloBajo || p.stock < 5;
      return coincideTexto && coincideStock;
    });
  });

  buscar(texto: string): void {
    this.filtro.set(texto);
  }

  // Alterna el filtro de stock bajo con signal.update (Actividad A1)
  toggleSoloStockBajo(): void {
    this.soloStockBajo.update(activo => !activo);
  }

  // Recibe el producto emitido por ProductoCard (hijo -> padre)
  mostrarDetalle(producto: Producto): void {
    this.seleccionado.set(producto);
  }

  cerrarDetalle(): void {
    this.seleccionado.set(null);
  }
}
