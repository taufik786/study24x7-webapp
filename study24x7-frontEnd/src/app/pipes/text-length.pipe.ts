import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'sliceText'
})

export class TextLenghtPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
  // transform(value: any) {
    if(value.length > 50){
      return value.slice(0,args) + '...'
    } else {
      return value
    }
  }
}
