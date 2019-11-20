import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class SignupService {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

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
