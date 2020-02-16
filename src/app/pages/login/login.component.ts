import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;
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
