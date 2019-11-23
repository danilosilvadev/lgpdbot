import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";
import { UserStatus } from "../../models/user.model";
import { take } from "rxjs/operators";

@Pipe({
  name: "asyncDepth"
})
export class AsyncDepthPipe implements PipeTransform {
  userStatusObservable: Observable<UserStatus>;

  transform(value: Observable<any>, prop: string): any {
    this.userStatusObservable = value;
    this.userStatusObservable.pipe(take(1)).subscribe(data => {
      return data[prop];
    });
  }
}
