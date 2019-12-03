import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ReducersModel } from "./models/reducers.model";
import { changeMessageToSpanish, changeMessageToEnglish } from "./ngrx/actions";
import { getMessage, getUserStatus } from "./ngrx/selectors";
import { UserStatusService } from './services';
import { UserStatus } from './models/user.model';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "ngrxFirestore";
  message$: Observable<string>;
  userStatusObservable: Observable<UserStatus>;
  userStatus
  
  constructor(
    private store: Store<ReducersModel>, 
    private userStatusService: UserStatusService
  ) {}

  ngOnInit() {
    /*this.message$ = this.store.pipe(
      select((state: reducersModel) => state.messageReducer.message)
    );*/
    this.message$ = this.store.select(getMessage);

  
    	

  }
  ngAfterViewInit() {
    this.userStatusService.fetchUserStatus().then(obs => {
      obs.subscribe(userStatus => {
        this.userStatus = userStatus;
      })
    });
  }
  spanishMessage() {
    this.store.dispatch(new changeMessageToSpanish());
  }

  englishMessage() {
    this.store.dispatch(new changeMessageToEnglish());
  }
}
