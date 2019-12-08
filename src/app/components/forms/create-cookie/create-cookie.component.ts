import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CookiesService } from "../../../services/cookies/cookies.service";

@Component({
  selector: "app-create-cookie",
  templateUrl: "./create-cookie.component.html",
  styleUrls: ["./create-cookie.component.scss"]
})
export class CreateCookieComponent implements OnInit {
  createCookieForm: FormGroup;
  @Output() registerCookie = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.createCookieForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      provider: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      expDate: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    this.registerCookie.emit({
      ...this.createCookieForm.value,
      expDate: new Date(this.createCookieForm.value["expDate"])
    });
    this.createCookieForm.reset();
  }
}
