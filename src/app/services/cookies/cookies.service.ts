import { Injectable } from "@angular/core";
import { getUIDFromIDB } from "../../utils/idb";

import {
  AngularFirestore,
  AngularFirestoreCollectionGroup
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { SetCookies } from "src/app/ngrx/actions/cookie.action";
import { Cookie } from "src/app/models/cookie.model";

@Injectable({
  providedIn: "root"
})
export class CookiesService {
  cookiesCollection: AngularFirestoreCollectionGroup;

  constructor(
    private afDb: AngularFirestore,
    private store: Store<ReducersModel>
  ) {}

  fetchCookies(domainId) {
    return getUIDFromIDB().then(uid => {
      if (!uid) return;
      this.cookiesCollection = this.afDb.collectionGroup("domains", ref =>
        ref.where("uid", "==", uid).where("domain_id", "==", domainId)
      );

      return this.cookiesCollection.snapshotChanges().pipe(
        map(res => {
          const cookies = res.map(
            ({ payload: { doc } }): Cookie => {
              const cookie = {
                cookieId: doc.data().cookie_id,
                cookieName: doc.data().cookie_name,
                expirationDate: doc.data().expiration_date,
                domainName: doc.data().domain_name,
                group: {
                  id: doc.data().group_id,
                  name: doc.data().group_name
                },
                provider: doc.data().provider
              };
              return cookie;
            }
          );
          // this.store.dispatch(new SetCookies(cookies));
          return cookies;
        })
      );
    });
  }

  registerCookie(cookie, domain, group) {
    this.afDb
      .collection("cookies")
      .doc(domain.did)
      .collection("group")
      .doc(group.gId)
      .collection("cookie")
      .add({
        ...cookie,
        domain,
        group
      });
  }
}
