import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { getUIDFromIDB } from "src/app/utils/idb";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DomainsService {
  uid: string;
  domainsCollection: AngularFirestoreCollection<any>;

  constructor(
    private store: Store<ReducersModel>,
    private afDb: AngularFirestore
  ) {
    this.store.select(getUserStatus).subscribe(data => {
      if (data) this.uid = data.uid;
    });
  }

  registerDomain(domain) {
    console.log("serv", domain);
  }

  fetchDomains() {
    return getUIDFromIDB().then(id => {
      this.domainsCollection = this.afDb.collection("domain_list", ref =>
        ref.where("uid", "==", id)
      );
      return this.domainsCollection.snapshotChanges().pipe(
        map(res => {
          const domains = res.map(({ payload: { doc } }) => ({
            name: doc.data().name,
            url: doc.data().url,
            isValidated: doc.data().isValidated
          }));
          // this.store.dispatch(new SetUserStatus(userStatus[0]));
          return domains;
        })
      );
    });
  }
}
