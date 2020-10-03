import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: Date, dateFormat: string): any {
    console.log(value);
    const date = new Date(value);
    format(date, dateFormat, { locale: ptBR });
  }

}
