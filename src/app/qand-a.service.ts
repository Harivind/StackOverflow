import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { AccountService } from "./account.service";
import { environment } from "../environments/environment";
import { Question } from "./shared/question";
import { Answer } from "./shared/answer";

@Injectable({
  providedIn: "root",
})
export class QandAService {
  public question: Question;
  public answer: Answer;
  _resp;
  constructor(
    private router: Router,
    private http: HttpClient,
    accService: AccountService
  ) {}

  postQuestion(question: Question) {
    this.http
      .post("http://localhost:3000/submitQuestion", question)
      .subscribe((data) => {
        this._resp = JSON.stringify(data);
        console.log(data);
        this._resp = JSON.parse(this._resp);
        if (this._resp.status == "Success") {
          alert("Success!");
          return true;
        }
        else
          alert(this._resp.status);
      });
    return false;
  }

  searchQuestion(searchText:String){
    this.http.get("http://localhost:3000/findQuestions?queryString="+searchText ).subscribe(data => {
      alert(data)
  })
  }

}
