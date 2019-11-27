import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService, UserStatusService } from "../../services";
import { getUserStatus } from "src/app/ngrx/selectors";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { SetUserStatus } from "src/app/ngrx/actions";
import { UserStatus } from "../../models/user.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userStatusObservable: Observable<UserStatus>;
  isVerified: boolean;

  constructor(
    private auth: AuthService,
    private userStatusService: UserStatusService,
    private store: Store<ReducersModel>
  ) {}

  ngOnInit() {
    this.store.select(getUserStatus).subscribe(data => {
      if (!data.userId) {
       // this.userStatusObservable = this.userStatusService.fetchUserStatus();
      }
    });
  }

  ngOnDestroy(): void {}

  logoutUser() {
    this.auth.logoutUser();
  }
}
