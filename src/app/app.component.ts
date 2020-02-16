import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ReducersModel } from "./models/reducers.model";
import { getUserStatus } from "./ngrx/selectors";
import { UserStatusService } from "./services";
import { UserStatus } from "./models/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "ngrxFirestore";
  userStatusObservable: Observable<UserStatus>;
  userStatus;

  constructor(
    private store: Store<ReducersModel>,
    private userStatusService: UserStatusService
  ) {}

  ngOnInit() {
    this.store.select(getUserStatus).subscribe(data => {
      if (!data.uid) {
        this.userStatusService.fetchUserStatus().then(obs => {
          this.userStatusObservable = obs;
        });
      }
    });
  }
}
