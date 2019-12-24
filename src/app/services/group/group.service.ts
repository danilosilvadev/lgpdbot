import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Domain } from "src/app/models/domain.model";

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

  updateGroup(
    group: { domain: Domain; gid: string; isActive: boolean; name: string },
    data: { type: string; value: any }
  ): void {
    this.afDb
      .collection("cookies")
      .doc(group.domain.did)
      .collection("group")
      .doc(group.gid)
      .set({ ...group, [data.type]: data.value });
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
          return res
            .map(item => ({
              ...item.payload.doc.data(),
              gid: item.payload.doc.id,
              isActive: item.payload.doc.data().isActive
            }))
            .filter(group => group.isActive !== false);
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
