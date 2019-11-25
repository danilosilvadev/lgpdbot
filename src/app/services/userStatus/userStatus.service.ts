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

@Injectable({
  providedIn: "root"
})
export class UserStatusService {
  appdataCollection: AngularFirestoreCollection<UserStatus>;

  constructor(
    private afDb: AngularFirestore,
    private store: Store<ReducersModel>
  ) {
    
  }

  fetchUserStatus() {
    const userId = ''
    if (!userId) return;
    this.appdataCollection = this.afDb.collection("user_status", ref =>
      ref.where("user_id", "==", userId)
    );
    return this.appdataCollection.snapshotChanges().pipe(
      map(res => {
        const userStatus = res.map(({ payload: { doc } }) => ({
          userId: userId,
          name: doc.data().name,
          email: doc.data().email,
          isVerified: doc.data().isVerified
        }));
        this.store.dispatch(new SetUserStatus(userStatus[0]));
        return userStatus[0];
      })
    );
  }
}
