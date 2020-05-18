import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from "@angular/router";
import { QandAService } from '../qand-a.service';
import { Post } from '../shared/post'
import { User } from '../shared/user';
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
  public currentUser: String;
  public user: User;

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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.currentUser = this.user.username;
  }
  base64textString = [];

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
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
    let answer = {
      questionID: this.questionID,
      user: user,
      description: this.answer.value.description,
      images: this.base64textString
    }
    this.qAndA.postAnswer(answer)
  }

  get formData() {
    return this.answer.controls;
  }

  deleteAnswer(answer: any) {
    this.qAndA.deleteAnswer(answer)
  }

  deleteQuestion(question: any) {
    this.qAndA.deleteQuestion(question)
  }
}
