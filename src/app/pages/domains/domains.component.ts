import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomainsService, UserStatusService } from 'src/app/services';
import { Domain } from 'src/app/models/domain.model';
import { Store } from '@ngrx/store';
import { ReducersModel } from 'src/app/models/reducers.model';
import { getUserStatus } from 'src/app/ngrx/selectors';
import { Observable } from 'rxjs';
import { DomainFormComponent } from 'src/app/components/forms/domain-form/domain-form.component';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  uid = '';
  did: string;
  domains: Domain[]
  domainsObservable: Observable<Domain[]>;
  editMode: boolean = false;
  editDomain: Domain;
  @ViewChild(DomainFormComponent, {static: false}) domainFormComponent: DomainFormComponent;

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

  onSelectDomain(domain) {
    this.editDomain = domain;
    this.editMode = true;
    this.did = domain.did;

    this.domainFormComponent.domainFormGroup.setValue({
      did: domain.did,
      active: domain.active,
      name: domain.name,
      url: domain.url
    });
    this.domainFormComponent.editMode = true;
    this.did = domain.cid;
  }

  onRegisterDomain(data) {
    const newDomain: Domain[] = [{
      did: `${Math.floor(Date.now() / 1000)}`, 
      name: data.name,
      url: data.url,
      active: false,
    }]

    const addedDomain: Domain[] = [...this.domains, ...newDomain];

    this.userStatusService.updateDomain(addedDomain, this.uid)
  }

  onUpdateDomain(domain) {

    const filteredDomain = this.domains.filter(item => item.did !== domain.did)

    const concatenatedDomain = filteredDomain.concat({
      did: domain.did,
      active: domain.active,
      name: domain.name,
      url: domain.url,
    });
    this.userStatusService.updateDomain(concatenatedDomain, this.uid)
  }


  onDeleteDomain(domain) {
    const filteredDomain = this.domains.filter(item => item.did !== domain.did)

    const concatenatedDomain = filteredDomain.concat({
      did: domain.did,
      active: !domain.active,
      name: domain.name,
      url: domain.url,
    });
    this.userStatusService.updateDomain(concatenatedDomain, this.uid)
  }

}
