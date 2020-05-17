import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

import { AccountService } from "./account.service";
import { DataSharingService } from './data-sharing.service';

import { Router } from '@angular/router';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})

export class AppComponent {

  title = "StackOverflow";
  isUserLoggedIn: boolean;
  searchText: String;
  searchBar = new FormControl('');

  constructor(private dataSharingService: DataSharingService, private accService: AccountService, private router: Router) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }

  logout() {
    this.accService.logout()
  }

  search() {
    this.searchText = this.searchBar.value;
    this.router.navigateByUrl("/search?q=" + this.searchText)
  }
}
