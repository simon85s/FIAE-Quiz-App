import { Directive, ElementRef, Input, OnChanges,HostListener } from '@angular/core';
@Directive({
  selector: '[myText]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {

  private el: HTMLElement;


  constructor(el: ElementRef) { this.el = el.nativeElement; }

  @Input() text: string;

   @HostListener('mouseenter') onMouseEnter() {
    this.setText('text');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setText('');
  }

   private setText(text:string) {
    this.el.textContent = text;
  }
}