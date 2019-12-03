import { Component, OnInit } from '@angular/core';
import { DomainsService } from 'src/app/services';
import { Observable } from 'rxjs';

interface Domain {
  name: string;
  url: string;
}

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  domain: Domain = {
    name: '',
    url: '',
  }
  domainList: { name: string; url: string; user_id: string}[]
  domainsObservable: Observable<Domain[]>;

  constructor(private domainsService: DomainsService) {
  
   }

  ngOnInit() {
    this.domainsService.fetchDomains().then(obs => {
      this.domainsObservable = obs;
    })
    
  }

  onSubmit($event) {
    this.domainsService.registerDomain($event.value)
  }

}
