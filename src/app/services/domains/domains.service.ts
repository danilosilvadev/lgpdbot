import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { ReducersModel } from 'src/app/models/reducers.model';
import { getUserStatus } from 'src/app/ngrx/selectors';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  userId: string;
  constructor(private store: Store<ReducersModel>) { 
    this.store.select(getUserStatus).subscribe(data => {
      if(data) this.userId = data.userId;
    })  
  }

  registerDomain(domain) {
    console.log('serv', domain)
  }

  fetchDomains() {
    console.log('userid', this.userId)
    return 'sting'

  }
}
