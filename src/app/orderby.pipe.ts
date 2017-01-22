import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(value: Array<any>, field: string): any {
        if (value == null || value.length === 0 || field == null) {
            return value;
        }

        console.log(`Sorting ${field}`);

        let firstVal = value[0];
        if (field.startsWith("-")) {
            field = field.substring(1);
            if (typeof firstVal[field] === 'string' || firstVal[field] instanceof String) {
                return [...value].sort((a, b) => b[field].localeCompare(a[field]));
            }

            return [...value].sort((a, b) => b[field] - a[field]);
        }
        else {
            if (typeof firstVal[field] === 'string' || firstVal[field] instanceof String) {
                return [...value].sort((a, b) => -b[field].localeCompare(a[field]));
            }

            return [...value].sort((a, b) => a[field] - b[field]);
        }
    }
}