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
import { 
  faPen, 
  faTrash,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

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
  group: Group;
  cid: string;
  activeCookieForm: boolean;
  @ViewChild(CreateCookieComponent, { static: false })
  createCookieComponent: CreateCookieComponent;
  faPen = faPen;
  faTrash = faTrash;
  faChevronRight = faChevronRight;

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
      console.log('data.domains[0]',data.domains[0] );
    });
    
  }

  onSelectCookie(cookie) {
    this.createCookieComponent.createCookieForm.setValue({
      name: cookie.name,
      expDate: this.timeStampToDatePipe.transform(cookie.expDate),
      provider: cookie.provider
    });
    this.activeCookieForm = true;
    this.createCookieComponent.editMode = true;
    this.cid = cookie.cid;
  }

  onSelectGroup(group) {
    this.group = group;
    this.createCookieComponent.editMode = false;
    this.onFetchCookies(this.domain.did, group.gid);
    this.activeCookieForm = false;
  }

  onOpenCookieForm() {
    this.createCookieComponent.editMode = false;
    this.activeCookieForm = true;
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
        gid: this.group.gid,
        active: true
      }
    );
  }

  onFetchCookies(did, gid) {
    if (did) {
      this.cookiesObservable = this.cookiesService.fetchCookies(did, gid);
    }
  }

  onUpdateCookie(cookie) {
    this.cookiesService.updateCookie({
      ...cookie,
      group: this.group,
      domain: this.domain,
      active: true,
      cid: this.cid
    });
    this.activeCookieForm = false;
  }

  onDeleteCookie(cookie) {
    this.cookiesService.updateCookie({
      ...cookie,
      group: this.group,
      domain: this.domain,
      active: false,
      cid: this.cid
    });
    this.activeCookieForm = false;
  }

  onUpdateGroup(data, group) {
    this.groupService.updateGroup({
      ...group,
      domain: this.domain,
      active: true,
      name: data.value
    });
  }

  onDeleteGroup(group) {
    this.groupService.updateGroup({
      ...group,
      domain: this.domain,
      active: false
    });
  }

  onFetchGroups(domain) {
    if (domain) {
      this.groupObservable = this.groupService.fetchGroups(domain.did);
    }
  }
}
