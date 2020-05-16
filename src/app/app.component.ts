import { Component } from "@angular/core";
import { AccountService } from "./account.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "StackOverflow";
  logedin: boolean = false;
  constructor(accService: AccountService) {
    this.logedin = accService.isLogedin();
  }
}
