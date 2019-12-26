import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-create-group",
  templateUrl: "./create-group.component.html",
  styleUrls: ["./create-group.component.scss"]
})
export class CreateGroupComponent implements OnInit {
  group: {
    name: string;
  } = { name: "" };
  @Output() registerGroup = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.registerGroup.emit(this.group);
    this.group = {
      name: ""
    };
  }
}
