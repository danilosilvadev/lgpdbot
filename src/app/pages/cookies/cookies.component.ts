import { Component, OnInit } from "@angular/core";
import { CookiesService } from "../../services";
import { Observable } from "rxjs";
import { Cookie } from "src/app/models/cookie.model";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import { GroupService } from "../../services";
import { Domain } from "../../models/domain.model";

@Component({
  selector: "app-cookies",
  templateUrl: "./cookies.component.html",
  styleUrls: ["./cookies.component.scss"]
})
export class CookiesComponent implements OnInit {
  cookiesObservable: Observable<Cookie[]>;
  domains: Domain[];
  domain: Domain;

  constructor(
    private cookiesService: CookiesService,
    private store: Store<ReducersModel>,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.store.select(getUserStatus).subscribe(data => {
      this.domains = data.domains;
      this.domain = data.domains[0];
    });
  }

  onRegisterGroup($event) {
    this.groupService.registerGroup($event, this.domain.dId);
  }

  onRegisterCookie($event) {
    console.log($event);
    this.cookiesService.registerCookie($event, this.domain, {
      name: "Obrigatórios",
      gId: "do92KBtWpR3h3aHSjQfq"
    });
  }

  onDomainSelected() {
    // TODO: Make the fucking fetch here
    this.cookiesService.fetchCookies("123").then(obs => {
      obs.subscribe(res => {
        this.cookiesObservable = obs;
        let arr = [];
        res.forEach(item => {
          if (arr.filter(i => i[0].domainName === item.domainName)) {
            arr.push([item]);
          }
        });
        // TODO: Here it will filter and separate in chunk arrays different groups to display separetely
        console.log(arr, "wistle");
        //console.log(res.filter(), "aqui");
      });
    });
  }
}
