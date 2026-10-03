import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
  standalone: true,
})
export class Resaltar {
  private readonly el = inject(ElementRef);

  // Input con valor por defecto: el componente que use la directiva
  // puede cambiar el color escribiendo appResaltar="#e8f4fd"
  readonly colorResaltado = input<string>('#f0f7ff');

  @HostListener('mouseenter') onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.colorResaltado();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
