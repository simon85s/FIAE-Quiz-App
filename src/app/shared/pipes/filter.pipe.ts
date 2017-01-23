import { Pipe, PipeTransform, Injectable } from '@angular/core';


@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    constructor() { }
   

    transform(items: any[], args: string): any {
        debugger;
        if (items == null || args == null || args === "") return items;

        var specialCharacters = /([.\\+?[^\]$(){}=!<>|:-])/g;
        var patt = new RegExp(args.replace(specialCharacters, "\\$1").replace(/\*/g, '.*'), 'ig');

        console.log(`Subjects - filtering for ${args}`);

        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => item.subject.match(patt));
    }
}