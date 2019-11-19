import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { SignupService } from "../../services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: Object = {};

  constructor(private signUp: SignupService) {}

  onSubmit() {
    this.signUp.registerUser(this.user);
  }

  ngOnInit() {}

  googleSignup() {}
}
