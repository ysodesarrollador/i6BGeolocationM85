import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'home2'
})
export class Home2Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
