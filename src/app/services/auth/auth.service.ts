import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ReducersModel } from "src/app/models/reducers.model";
import { StartLoading, StopLoading, SetUserStatus } from "../../ngrx/actions";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<ReducersModel>
  ) {}

  userStatusMiddleware(currentUser) {
    return {
      email: currentUser.email,
      name: currentUser.displayName,
      isVerified: currentUser.emailVerified,
      userId: currentUser.uid
    };
  }

  loginUser(authData: { email: string; password: string }) {
    this.store.dispatch(new StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.onSuccessLogin();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.store.dispatch(new StopLoading());
      });
  }

  onSuccessLogin() {
    const userStatus = this.userStatusMiddleware(this.afAuth.auth.currentUser);
    this.store.dispatch(new SetUserStatus(userStatus));
    this.router.navigate([`user/${userStatus.userId}/dashboard`]);
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
          var currentUser = this.afAuth.auth.currentUser;
          currentUser
            .sendEmailVerification()
            .then(() => {
              const userStatus = this.userStatusMiddleware(currentUser);
              this.store.dispatch(new SetUserStatus(userStatus));
              this.router.navigate([`user/${userStatus.userId}/dashboard`]);
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
