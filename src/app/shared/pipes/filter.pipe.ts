import { Pipe, PipeTransform, Injectable } from '@angular/core';


@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    constructor() { }
   

    transform(items: any[], args: string): any {
       
        if (items == null || args == null || args === "") return items;

        var specialCharacters = /([.\\+?[^\]$(){}=!<>|:-])/g;
        var patt = new RegExp(args.replace(specialCharacters, "\\$1").replace(/\*/g, '.*'), 'ig');

        console.log(`Subjects - filtering for ${args}`);
        return items.filter(item => item.subject.match(patt));
    }
}