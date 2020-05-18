import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

import { QandAService } from "../qand-a.service";
import { Question } from '../shared/question';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {

  mySubscription: any;
  public questions: Question[];
  searchString:String;
  public noresults: Boolean;
  constructor(private route: ActivatedRoute, private qaService: QandAService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });


    var a=route.queryParams;
    this.searchString=a['_value'].q;
    this.qaService.searchQuestion(this.searchString).subscribe((data:any) => {
      this.questions = data.questions;
      this.noresults=this.questions.length==0?true:false
    });
  }

  ngOnInit(): void {

  }
}
