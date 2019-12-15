import { Component, OnInit, ViewChild } from "@angular/core";
import { CookiesService } from "../../services";
import { Observable } from "rxjs";
import { Cookie } from "src/app/models/cookie.model";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { getUserStatus } from "src/app/ngrx/selectors";
import { GroupService } from "../../services";
import { Domain } from "../../models/domain.model";
import { Group } from "../../models/group.model";
import { CreateCookieComponent } from "../../components/forms/create-cookie/create-cookie.component";
import { TimeStampToDatePipe } from "../../utils/pipes/time-stamp-to-date.pipe";

@Component({
  selector: "app-cookies",
  templateUrl: "./cookies.component.html",
  styleUrls: ["./cookies.component.scss"],
  providers: [TimeStampToDatePipe]
})
export class CookiesComponent implements OnInit {
  cookiesObservable: Observable<Cookie[]>;
  groupObservable: Observable<Group[]>;
  domains: Domain[];
  domain: Domain;
  gid: string;
  @ViewChild(CreateCookieComponent, { static: false })
  createCookieComponent: CreateCookieComponent;

  constructor(
    private cookiesService: CookiesService,
    private store: Store<ReducersModel>,
    private groupService: GroupService,
    private timeStampToDatePipe: TimeStampToDatePipe
  ) {}

  ngOnInit() {
    this.store.select(getUserStatus).subscribe(data => {
      this.domains = data.domains;
      this.domain = data.domains[0];
      this.onFetchGroups(data.domains[0]);
      this.onFetchCookies(data.domains[0]); // TODO: If this changes to pick only inside the group onclick this fethc will not be here
    });
  }

  onSelectCookie(cookie) {
    this.gid = cookie.domain.did;
    this.createCookieComponent.createCookieForm.setValue({
      name: cookie.name,
      expDate: this.timeStampToDatePipe.transform(cookie.expDate),
      provider: cookie.provider
    });
    this.createCookieComponent.editMode = true;
  }

  onSelectGroup(gid) {
    this.gid = gid;
    this.createCookieComponent.editMode = false;
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

  onUpdateCookie(cookie) {
    console.log(cookie);
    /*
    this.cookiesService.updateCookie(
      { ...cookie, active: true },
      { type: "name", value: data.value }
    );
    */
  }

  onDeleteCookie(cookie) {
    this.cookiesService.updateCookie(cookie, { type: "active", value: false });
  }

  onUpdateGroup(data, group) {
    this.groupService.updateGroup(
      { ...group, domain: this.domain, active: true },
      { type: "name", value: data.value }
    );
  }

  onDeleteGroup(group) {
    this.groupService.updateGroup(
      { ...group, domain: this.domain },
      { type: "active", value: false }
    );
  }

  onFetchGroups(domain) {
    if (domain) {
      this.groupObservable = this.groupService.fetchGroups(domain.did);
    }
  }
}
