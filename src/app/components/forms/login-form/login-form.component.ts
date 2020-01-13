import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  user: Object = {};
  @Output() loginUser = new EventEmitter();

  constructor() {}

  onSubmit() {
    this.loginUser.emit(this.user);
  }

  ngOnInit() {}
}
