import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from "@angular/router";
import { QandAService } from '../qand-a.service';
import { Post } from '../shared/post'
import { FormControl, FormGroup, FormBuilder, Validators, } from "@angular/forms";
// import { threadId } from 'worker_threads';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  public questionID: String;
  public post: Post;
  submitted: boolean;
  answer: FormGroup
  mySubscription: any;

  constructor(private qAndA: QandAService, private route: ActivatedRoute, private formbuilder: FormBuilder, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.questionID = params['questionID'];
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.submitted = false;
    this.answer = this.formbuilder.group({
      description: ["", Validators.required]
    });
    this.qAndA.getPost(this.questionID).subscribe(data => this.post = data)
    console.log(this.questionID)
  }

  postAnswer() {
    this.submitted = true;
    let user = JSON.parse(localStorage.getItem("user")).username;
    console.log(this.answer.value)
    let answer = {
      questionID: this.questionID,
      user: user,
      description: this.answer.value.description,
      images: this.answer.value.images
    }
    this.qAndA.postAnswer(answer)
  }

  get formData() {
    return this.answer.controls;
  }

}
