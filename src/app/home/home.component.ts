import { Component, OnInit } from "@angular/core";
import { User } from "../shared/user";
import { DataSharingService } from '../data-sharing.service';
import { QandAService } from '../qand-a.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean;

  constructor(private dataSharingService: DataSharingService, private qaService: QandAService,private router: Router) {
    this.dataSharingService.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit(): void {}

  browse() {
    this.router.navigateByUrl("/search?q=")
  }
}
