import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { ReducersModel } from 'src/app/models/reducers.model';
import { getUserStatus } from 'src/app/ngrx/selectors';
import { getUIDFromIDB } from '../../utils/idb'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  userId: string;
  appdataCollection: AngularFirestoreCollection;

  constructor(
    private afDb: AngularFirestore,
    private store: Store<ReducersModel>
  ) { 
    this.store.select(getUserStatus).subscribe(data => {
      if(data) this.userId = data.userId;
    });
  }

  registerDomain(domain) {
    console.log('serv', domain)
  }

  fetchDomains() {        
    

    return getUIDFromIDB().then(userId => {
      
      if (!userId) return;

      this.appdataCollection = this.afDb.collection("domain_list", ref =>
        ref.where("user_id", "==", userId)
      );
      

      return this.appdataCollection.snapshotChanges().pipe(
        map(res => {
          const domainList = res.map(({ payload: { doc } }) => ({
            uid: userId,
            name: doc.data().name,
            url: doc.data().url,
            isValidated: doc.data().isValidated,
          }));

          
          //this.store.dispatch(new SetUserStatus(userStatus[0]));
          return domainList 
        })
      );
    })

  }
}
