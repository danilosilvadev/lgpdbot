import { Component, OnInit } from "@angular/core";
import { AuthService, AppdataService } from "../../services";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService, private appdata: AppdataService) {}

  ngOnInit() {
    this.appdata.data.subscribe(data => {
      console.log(data, "aqui o appdata");
    });
  }

  logoutUser() {
    this.auth.logoutUser();
  }
}
