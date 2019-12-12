import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomainsService, UserStatusService } from 'src/app/services';
import { Domain } from 'src/app/models/domain.model';
import { Store } from '@ngrx/store';
import { ReducersModel } from 'src/app/models/reducers.model';
import { getUserStatus } from 'src/app/ngrx/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  uid = ''
  domains: Domain[]
  domainsObservable: Observable<Domain[]>;
  isEditing: boolean = false;
  editDomain: Domain;
  @ViewChild('domainName', {static: false}) domainName: ElementRef;

  constructor(
    private store: Store<ReducersModel>,
    private userStatusService: UserStatusService
    ) {
  
   }

  ngOnInit() {
    this.store.select(getUserStatus).subscribe(data => {
      if (data) {
        this.uid = data.uid;
        this.domains = data.domains
      }
    });
  }

  onRegisterDomain(data) {
    
    this.userStatusService.registerDomain(data, this.uid, this.domains)
  }
  onUpdateDomain(data) {
    //call service
  }

  onPopulateForm(domain) {
    this.editDomain = domain;
    this.isEditing = true;
  }

}
