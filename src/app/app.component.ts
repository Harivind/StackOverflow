import { Component } from "@angular/core";
import {FormControl} from "@angular/forms";

import { AccountService } from "./account.service";
import { QandAService } from "./qand-a.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})

export class AppComponent {

  title = "StackOverflow";
  searchText: String;
  logedin: boolean = false;
  searchBar = new FormControl('');

  constructor(private accService: AccountService, private qaService: QandAService) {
    this.logedin = true
  }

  search(){
    this.searchText=this.searchBar .value;
    alert(this.searchText)
    this.qaService.searchQuestion(this.searchText);
  }

}
