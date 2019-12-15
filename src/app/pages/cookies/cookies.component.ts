import { Component, OnInit } from "@angular/core";
import { CookiesService } from "../../services";
import { Observable } from "rxjs";
import { Cookie } from "src/app/models/cookie.model";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import { GroupService } from "../../services";
import { Domain } from "../../models/domain.model";
import { Group } from "../../models/group.model";

@Component({
  selector: "app-cookies",
  templateUrl: "./cookies.component.html",
  styleUrls: ["./cookies.component.scss"]
})
export class CookiesComponent implements OnInit {
  cookiesObservable: Observable<Cookie[]>;
  groupObservable: Observable<Group[]>;
  domains: Domain[];
  domain: Domain;  gid: string;

  constructor(
    private cookiesService: CookiesService,
    private store: Store<ReducersModel>,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.store.select(getUserStatus).subscribe(data => {
      this.domains = data.domains;
      this.domain = data.domains[0];
      this.onFetchGroups(data.domains[0]);
      this.onFetchCookies(data.domains[0]);
    });
  }

  onSelectGroup(gid) {
    this.gid = gid;
  }

  onRegisterGroup($event) {
    this.groupService.registerGroup($event, this.domain);
  }

  onRegisterCookie($event) {
    this.cookiesService.registerCookie(
      $event,
      {
        did: this.domain.did,
        active: true
      },
      {
        gid: this.gid,
        active: true
      }
    );
  }

  onFetchCookies(domain) {
    if (domain) {
      this.cookiesObservable = this.cookiesService.fetchCookies(domain.did);
    }
  }

  /*
  onDeleteCookie(cookie) {
    this.cookiesService.updateCookie(cookie, {
      type: "active",
      value: false
    });
  }
  */

  /*
  onUpdateCookie(data, cookie) {
    this.cookiesService.updateCookie(
      { ...cookie, active: true },
      { type: "name", value: data.value }
    );
  }
  */

  onDeleteCookie(cookie) {
    this.cookiesService.updateCookie(cookie, { type: "active", value: false });
  }

  onUpdateGroup(data, group) {
    this.groupService.updateGroup(
      { ...group, active: true },
      { type: "name", value: data.value }
    );
  }

  onDeleteGroup(group) {
    this.groupService.updateGroup(group, { type: "active", value: false });
  }

  onFetchGroups(domain) {
    if (domain) {
      this.groupObservable = this.groupService.fetchGroups(domain.did);
    }
  }
}
