import { Component, OnInit } from "@angular/core";
import { User } from "../shared/user";
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean;

  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit(): void {}
}
