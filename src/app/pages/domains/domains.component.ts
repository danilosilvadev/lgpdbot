import { Component, OnInit } from '@angular/core';
import { DomainsService } from 'src/app/services';

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

  constructor(private domainsService: DomainsService) {
  
   }

  ngOnInit() {
    /* SATUR FAÇA ISSO
    this.domainsService.fetchDomains().subscribe(data => {
      this.domainList = data
    })
    */
  }

  onSubmit($event) {
    this.domainsService.registerDomain($event.value)
  }

}
