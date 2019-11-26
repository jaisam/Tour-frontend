import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthYearFormat'
})
export class MonthYearFormatPipe implements PipeTransform {

  transform(value ): any {
    let monthYearFormat ;
    let date = new Date(value); // value has date in ISO date format. toLocalString works on normal new Date format
    monthYearFormat = `${date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}`;
    return monthYearFormat;
  }

}
