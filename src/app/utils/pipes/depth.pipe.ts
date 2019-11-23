import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "depth"
})
export class DepthPipe implements PipeTransform {
  transform(value: any, prop: string): any {
    return value[prop];
  }
}
