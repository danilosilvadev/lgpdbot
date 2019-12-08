import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CookiesService } from "../../../services/cookies/cookies.service";

@Component({
  selector: "app-create-cookie",
  templateUrl: "./create-cookie.component.html",
  styleUrls: ["./create-cookie.component.scss"]
})
export class CreateCookieComponent implements OnInit {
  createCookieForm: FormGroup;

  constructor(private cookieService: CookiesService) {}

  ngOnInit() {
    this.createCookieForm = new FormGroup({
      cookieName: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      provider: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      expirationDate: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    this.cookieService.registerCookie(this.createCookieForm.value);
    this.createCookieForm.reset();
  }
}
