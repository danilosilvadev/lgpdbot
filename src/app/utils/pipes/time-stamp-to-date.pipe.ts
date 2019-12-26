import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "timeStampToDate"
})
export class TimeStampToDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const expDate = new Date(Number(value.seconds * 1000));
    const day = ("0" + expDate.getDate()).slice(-2);
    const month = ("0" + (expDate.getMonth() + 1)).slice(-2);
    const date = expDate.getFullYear() + "-" + month + "-" + day;
    return date;
  }
}
