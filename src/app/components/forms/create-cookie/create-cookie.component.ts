import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-create-cookie",
  templateUrl: "./create-cookie.component.html",
  styleUrls: ["./create-cookie.component.scss"]
})
export class CreateCookieComponent implements OnInit {
  createCookieForm: FormGroup;
  @Output() registerCookie = new EventEmitter();
  @Output() updateCookie = new EventEmitter();
  editMode: boolean;

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

    if (this.editMode) {
      this.updateCookie.emit({
        ...this.createCookieForm.value,
        expDate: new Date(this.createCookieForm.value["expDate"])
      });
    } else {
      this.registerCookie.emit({
        ...this.createCookieForm.value,
        expDate: new Date(this.createCookieForm.value["expDate"])
      });
    }
    this.createCookieForm.reset();
  }
}
