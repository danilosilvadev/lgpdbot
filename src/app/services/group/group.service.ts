import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  uid: string;

  constructor(
    private store: Store<ReducersModel>,
    private afDb: AngularFirestore
  ) {}

  deactivateGroup(group, did) {
    this.afDb
      .collection("cookies")
      .doc(did)
      .collection("group")
      .doc(group.did)
      .set({ ...group, isActive: false });
  }

  updateGroup(groupName, group) {
    this.afDb
      .collection("cookies")
      .doc(group.domain.did)
      .collection("group")
      .doc(group.gid)
      .set({ ...group, name: groupName });
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
        map(res => {
          return res.map(item => ({
            ...item.payload.doc.data(),
            gid: item.payload.doc.id,
            isActive: true
          }));
        })
      );
  }

  registerGroup(
    group: { name: string; groupActive: boolean },
    domain: { did: string; domainActive: boolean }
  ) {
    this.afDb
      .collection("cookies")
      .doc(domain.did)
      .collection("group")
      .add({ ...group, domain });
  }
}
