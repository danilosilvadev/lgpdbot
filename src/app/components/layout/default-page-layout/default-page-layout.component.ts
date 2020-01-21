import { Component, OnInit } from '@angular/core';
import { 
  faPlus, 
  faChevronRight, 
  faHome, 
  faChartLine, 
  faCookieBite,
  faMapSigns
} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { UserStatus } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { ReducersModel } from 'src/app/models/reducers.model';
import { UserStatusService } from 'src/app/services';
import { getUserStatus } from 'src/app/ngrx/selectors';

@Component({
  selector: 'app-default-page-layout',
  templateUrl: './default-page-layout.component.html',
  styleUrls: ['./default-page-layout.component.scss']
})
export class DefaultPageLayoutComponent implements OnInit {
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faUserCircle = faUserCircle;
  faHome = faHome
  faChartLine = faChartLine
  faCookieBite = faCookieBite
  faMapSigns = faMapSigns
  iconColor = "#767d97"
  userStatusObservable: Observable<UserStatus>;
  userStatus;
  
  constructor(
    private store: Store<ReducersModel>,
    private userStatusService: UserStatusService
  ) {}

  ngOnInit() {
    this.store.select(getUserStatus).subscribe(data => {
      if (!data.uid) {
        this.userStatusService.fetchUserStatus().then(obs => {
          this.userStatusObservable = obs;
        });
      }
    });
  }

}
