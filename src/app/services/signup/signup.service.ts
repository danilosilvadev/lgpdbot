import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class SignupService {
  fireUser: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.fireUser = afAuth.authState;
  }

  registerUser(authData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.authSuccess(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  authSuccess(res) {
    console.log(res);
  }
}
