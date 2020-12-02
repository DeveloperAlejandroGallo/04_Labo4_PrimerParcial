import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDeshabilitar]'
})
export class DeshabilitarDirective {

  @Input() deshabilitar: boolean;

  constructor(private element: ElementRef) { 
  }

  ngOnInit() {

    this.element.nativeElement.disabled = this.deshabilitar;
 
  }

}
