import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCambiaColor]'
})
export class CambiaColorDirective {

  @Input() color: string;

  constructor(private element: ElementRef) { 
  }

  ngOnInit() {

    this.element.nativeElement.style.backgroundColor = this.color;
 
  }
}
