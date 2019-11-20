import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  isAuth() {
    return this.isAuthenticated;
  }

  loginUser(authData: { email: string; password: string }) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.isAuthenticated = true;
        this.router.navigate(["/dashboard"]);
      })
      .catch(err => {
        console.error(err);
      });
  }

  registerUser(authData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.isAuthenticated = true;
        this.router.navigate(["/dashboard"]);
      })
      .catch(err => {
        console.error(err);
      });
  }

  logoutUser() {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.isAuthenticated = false;
        this.router.navigate(["/login"]);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
