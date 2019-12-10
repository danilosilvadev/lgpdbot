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
  groupObservable: Observable<any>;
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
      this.onLoadgroups(data.domains[0]);
    });
  }

  onRegisterGroup($event) {
    this.groupService.registerGroup($event, this.domain);
  }

  onRegisterCookie($event) {
    this.cookiesService.registerCookie(
      $event,
      {
        did: this.domain.did,
        domainActive: true
      },
      {
        gid: "mUi3hXVkM4vPjtNHj0aa",
        groupActive: true
      }
    );
  }

  onUpdateGroup(data, group) {
    this.groupService.updateGroup(data.value, group);
  }

  onLoadgroups(domain) {
    if (domain) {
      this.groupObservable = this.groupService.fetchGroups(domain.did);
    }
  }
}
