import { Component } from "@angular/core";
import { AccountService } from "./account.service";
import { DataSharingService } from './data-sharing.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "StackOverflow";
  isUserLoggedIn: boolean;
  constructor(private dataSharingService: DataSharingService, private accService: AccountService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }

  logout() {
    this.accService.logout()
  }
}
