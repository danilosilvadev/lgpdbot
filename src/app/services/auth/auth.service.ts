import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { StartLoading, StopLoading, SetUserStatus } from "../../ngrx/actions";
import { UserStatusService } from "../userStatus/userStatus.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<ReducersModel>,
    private userStatusService: UserStatusService
  ) {}

  loginUser(authData: { email: string; password: string }) {
    this.store.dispatch(new StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.router.navigate([`/dashboard`]);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.store.dispatch(new StopLoading());
      });
  }

  registerUser(authData) {
    this.store.dispatch(new StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.onSuccessRegister(res.user, authData.name);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.store.dispatch(new StopLoading());
      });
  }

  onSuccessRegister(user, name) {
    if (user) {
      user
        .updateProfile({ displayName: name })
        .then(() => {
          const currentUser = this.afAuth.auth.currentUser;
          currentUser
            .sendEmailVerification()
            .then(() => {
              this.userStatusService.registerUserStatus(currentUser);
              this.router.navigate([`/dashboard`]);
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  sendEmailVerification() {
    const currentUser = this.afAuth.auth.currentUser;
    currentUser.sendEmailVerification();
  }

  logoutUser() {
    this.store.dispatch(new StartLoading());
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(["/login"]);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.store.dispatch(new StopLoading());
      });
  }
}
