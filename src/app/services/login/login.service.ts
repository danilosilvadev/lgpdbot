import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  loginUser(authData: { email: string; password: string }) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.router.navigate(["/dashboard"]);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
