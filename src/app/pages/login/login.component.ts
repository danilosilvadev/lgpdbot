import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginMode = true;

  constructor(private auth: AuthService) {}

  onCreateUser(user) {
    this.auth.registerUser(user);
  }

  onLoginUser(user) {
    this.auth.loginUser(user);
  }

  toggleLogingMode() {
    this.loginMode = !this.loginMode;
  }

  ngOnInit() {}
}
