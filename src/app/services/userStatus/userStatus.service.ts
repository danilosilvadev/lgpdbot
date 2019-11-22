import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { UserStatus } from "../../models/user.model";
import { SetUserStatus } from "src/app/ngrx/actions";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";

@Injectable({
  providedIn: "root"
})
export class UserStatusService {
  appdataCollection: AngularFirestoreCollection<UserStatus>;
  userId: string;

  constructor(
    private afDb: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<ReducersModel>
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  fetchUserStatus() {
    if (!this.userId) return;
    this.appdataCollection = this.afDb.collection("user_status", ref =>
      ref.where("user_id", "==", this.userId)
    );
    return this.appdataCollection.snapshotChanges().pipe(
      map(res => {
        const userStatus = res.map(({ payload: { doc } }) => ({
          userId: this.userId,
          name: doc.data().name,
          email: doc.data().email,
          isVerified: doc.data().isVerified
        }));
        return userStatus[0];
      })
    );
  }
}
