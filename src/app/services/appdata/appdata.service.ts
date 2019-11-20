import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AppdataService {
  appdataCollection: AngularFirestoreCollection<{
    username: string;
  }>;

  constructor(private afDb: AngularFirestore) {}

  get data() {
    this.appdataCollection = this.afDb.collection("appdata");
    return this.appdataCollection.snapshotChanges().pipe(
      map(res => {
        return res.map(data => ({
          id: data.payload.doc.id,
          username: data.payload.doc.data().username
        }));
      })
    );
  }
}
