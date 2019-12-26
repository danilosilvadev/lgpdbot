import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Domain } from "src/app/models/domain.model";
import { Group } from "../../models/group.model";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  uid: string;

  constructor(
    private store: Store<ReducersModel>,
    private afDb: AngularFirestore
  ) {}

  updateGroup(group: {
    domain: Domain;
    gid: string;
    active: boolean;
    name: string;
  }): void {
    this.afDb
      .collection("cookies")
      .doc(group.domain.did)
      .collection("group")
      .doc(group.gid)
      .set({ ...group });
  }

  fetchGroups(did) {
    this.store.select(getUserStatus).subscribe(data => {
      this.uid = data.uid;
    });

    return this.afDb
      .collection("cookies")
      .doc(did)
      .collection("group")
      .snapshotChanges()
      .pipe(
        map((res): Group[] => {
          return res
            .map(item => ({
              name: item.payload.doc.data().name,
              gid: item.payload.doc.id,
              active: item.payload.doc.data().active
            }))
            .filter(group => group.active !== false);
        })
      );
  }

  registerGroup(
    group: { name: string; active: boolean },
    domain: { did: string; active: boolean }
  ) {
    this.afDb
      .collection("cookies")
      .doc(domain.did)
      .collection("group")
      .add({ ...group, active: true, domain });
  }
}
