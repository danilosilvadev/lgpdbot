import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService, UserStatusService } from "../../services";
import { getUserStatus } from "src/app/ngrx/selectors";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { ActivatedRoute } from "@angular/router";
import { SetUserStatus } from "src/app/ngrx/actions";
import { UserStatus } from "../../models/user.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userStatusObservable: any;
  userStatus: Observable<UserStatus>;

  constructor(
    private auth: AuthService,
    private userStatusService: UserStatusService,
    private store: Store<ReducersModel>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.select(getUserStatus).subscribe(data => {
      if (!data.userId) {
        this.userStatusObservable = this.userStatusService.fetchUserStatus();
      } else {
        this.userStatus = data;
      }
    });
    this.userStatusObservable.subscribe(userStatus => {
      this.userStatus = userStatus;
      this.store.dispatch(new SetUserStatus(userStatus));
    });
  }

  ngOnDestroy(): void {}

  logoutUser() {
    this.auth.logoutUser();
  }
}
