import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
    constructor(public el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'grey';
    }

 private highlight(color:string) {
     
        this.el.nativeElement.style.backgroundColor= color;
    }
   
   ngOnChanges(){
       this.highlight(this.myHighlight)
   }

   
   @Input() myHighlight: string;
}