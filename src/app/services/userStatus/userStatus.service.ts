import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { UserStatus } from "../../models/user.model";
import { SetUserStatus } from "src/app/ngrx/actions";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUIDFromIDB } from "../../utils/idb";
import { FIREBASE_KEY } from "../../keys";
import { Domain } from 'src/app/models/domain.model';

@Injectable({
  providedIn: "root"
})
export class UserStatusService {
  userStatusCollection: AngularFirestoreCollection<UserStatus>;

  constructor(
    private afDb: AngularFirestore,
    private store: Store<ReducersModel>
  ) {}

  userStatusMiddleware(currentUser): UserStatus {
    return {
      email: currentUser.email,
      name: currentUser.displayName,
      isVerified: currentUser.emailVerified,
      uid: currentUser.uid,
      domains: []
    };
  }

  registerDomain(
    domain: { name: string, url: string }, 
    uid: string, 
    domains: Array<Domain>
  ) {

    this.afDb
      .collection("users")
      .doc(uid)
      .update({
        domains: [...domains, { did: domain.url, isValidated: false, ...domain }]
      })
  }

  registerUserStatus(currentUser) {
    const userStatus = this.userStatusMiddleware(currentUser);
    this.store.dispatch(new SetUserStatus(userStatus));
    this.afDb
      .collection("users")
      .doc(userStatus.uid)
      .set({
        ...userStatus,
        domains: []
      });
  }

  fetchUserStatus() {
    let uid;
    return getUIDFromIDB().then(userId => {
      if (!userId) {
        uid = JSON.parse(localStorage.getItem(FIREBASE_KEY)).uid;
      } else {
        uid = userId;
      }
      this.userStatusCollection = this.afDb.collection("users", ref =>
        ref.where("uid", "==", uid)
      );
      return this.userStatusCollection.snapshotChanges().pipe(
        map(
          (res): UserStatus => {
            const userStatus = res[0].payload.doc.data();
            this.store.dispatch(new SetUserStatus(userStatus));
            return userStatus;
          }
        )
      );
    });
  }
}
