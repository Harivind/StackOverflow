import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Question } from "./shared/question";
import { Answer } from "./shared/answer";
import { Post } from './shared/post';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { Post, PostAdapter } from "./shared/post"

@Injectable({
  providedIn: "root",
})
export class QandAService {

  public questions: Question[];
  public answer: Answer;
  public post: Post;
  _resp;

  constructor(

    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
  ) { }


  openSnackBar(message: string) {
    this._snackBar.open(message, "close", {
      duration: 2000,
    });
  }


  postQuestion(question: Question) {
    this.http
      .post("http://localhost:3000/submitQuestion", question)
      .subscribe((data) => {
        this._resp = data;
        if (this._resp.status == "Success") {
          this.openSnackBar("Question Posted")
          this.router.navigateByUrl("/post?questionID=" + this._resp.questionID)
        }
        else
          alert(this._resp.status);
      });
  }

  searchQuestion(searchText: String) {
    return this.http.get("http://localhost:3000/findQuestions?queryString=" + searchText).pipe(
      map((questions: Question[]) => {
        return questions;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  getUserQuestions(username: String) {
    return this.http.get("http://localhost:3000/getUserQuestions?username="+username).pipe(
      map((questions: Question[][]) => {
        return questions;
      }), catchError(error => {
        return throwError('Something went wrong!');
      })
    )
  }

  getPost(questionID: String) {
    return this.http.get("http://localhost:3000/getPost?questionID=" + questionID).pipe(
      map((post: Post) => {
        for ( let i in post.answers){
          i
        }
        return post;
      }), catchError(error => { return throwError("Something went wrong in post"); })
    )
  }

  postAnswer(answer: any) {
    this.http.post("http://localhost:3000/submitAnswer", answer, {
      withCredentials: true
    }).subscribe(data => {
      this._resp = data;
      if (this._resp.status == "Success") {
        this.router.navigateByUrl("/post?questionID=" + answer.questionID)
        this.openSnackBar("Answer Posted")
      }
      else
      this.openSnackBar("Failed to post answer")

    })
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  deleteAnswer(answer: any) {
    this.http.delete("http://localhost:3000/deleteAnswer/" + answer._id).subscribe((data: any) => {
      if (data.status == 'Success') {
        this.openSnackBar("Succesfully Deleted")
        this.router.navigateByUrl("/post?questionID=" + answer.questionID)
      }
      else
        alert("Delete Failure")
    })
  }

  deleteQuestion(question: any) {
    this.http.delete("http://localhost:3000/deleteQuestion/" + question._id).subscribe((data: any) => {
      if (data.status == 'Success') {
        this.openSnackBar("Succesfully Deleted")
        this.router.navigateByUrl("/")
      }
      else
        alert("Delete Failure")
    })
  }

}
