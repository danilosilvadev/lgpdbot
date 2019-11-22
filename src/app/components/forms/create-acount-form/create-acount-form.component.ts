import { Component, OnInit, Output, EventEmitter } from "@angular/core";

interface User {
  email: string;
  password: string;
  name: string;
}

@Component({
  selector: "app-create-acount-form",
  templateUrl: "./create-acount-form.component.html",
  styleUrls: ["./create-acount-form.component.scss"]
})
export class CreateAcountFormComponent implements OnInit {
  user: User = {
    email: "",
    password: "",
    name: ""
  };
  @Output() createUser = new EventEmitter();

  onSubmit() {
    this.createUser.emit(this.user);
  }

  constructor() {}

  ngOnInit() {}
}
