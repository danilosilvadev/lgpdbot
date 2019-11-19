import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ReducersModel } from "./models/reducers.model";
import { changeMessageToSpanish, changeMessageToEnglish } from "./ngrx/actions";
import { getMessage } from "./ngrx/selectors";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "ngrxFirestore";
  message$: Observable<string>;

  constructor(private store: Store<ReducersModel>) {}

  ngOnInit() {
    /*this.message$ = this.store.pipe(
      select((state: reducersModel) => state.messageReducer.message)
    );*/
    this.message$ = this.store.select(getMessage);
  }

  spanishMessage() {
    this.store.dispatch(new changeMessageToSpanish());
  }

  englishMessage() {
    this.store.dispatch(new changeMessageToEnglish());
  }
}
