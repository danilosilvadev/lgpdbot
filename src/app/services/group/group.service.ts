import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  constructor(
    private store: Store<ReducersModel>,
    private af: AngularFirestore
  ) {}

  registerGroup(group: { name: string }, did: string) {
    this.store.select(getUserStatus).subscribe(data => {
      this.af
        .collection("cookies")
        .doc(did)
        .collection("group")
        .add(group);
    });
  }
}
