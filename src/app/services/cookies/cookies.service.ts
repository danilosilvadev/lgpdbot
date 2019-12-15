import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollectionGroup
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { Cookie } from "src/app/models/cookie.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CookiesService {
  cookiesCollection: AngularFirestoreCollectionGroup;
  uid: string;

  constructor(
    private afDb: AngularFirestore,
    private store: Store<ReducersModel>
  ) {}

  updateCookie(cookie: Cookie): void {
    this.afDb
      .collection("cookies")
      .doc(cookie.domain.did)
      .collection("group")
      .doc(cookie.group.gid)
      .collection("cookie")
      .doc(cookie.cid)
      .set({ ...cookie });
  }

  fetchCookies(did, gid): Observable<Cookie[]> {
    this.store.select(getUserStatus).subscribe(data => {
      this.uid = data.uid;
    });
    if (!this.uid) {
      return;
    }
    return this.afDb
      .collection("cookies")
      .doc(did)
      .collection("group")
      .doc(gid)
      .collection("cookie")
      .snapshotChanges()
      .pipe(
        map((res): Cookie[] => {
          const cookies = res.map(
            ({ payload: { doc } }): Cookie => {
              return {
                name: doc.data().name,
                active: doc.data().active,
                expDate: doc.data().expDate,
                domain: doc.data().domain,
                provider: doc.data().provider,
                group: doc.data().group,
                cid: doc.id
              };
            }
          );
          // this.store.dispatch(new SetCookies(cookies));
          return cookies.filter(cookie => cookie.active !== false);
        })
      );
  }

  registerCookie(cookie, domain, group) {
    this.afDb
      .collection("cookies")
      .doc(domain.did)
      .collection("group")
      .doc(group.gid)
      .collection("cookie")
      .add({
        ...cookie,
        domain,
        group
      });
  }
}
