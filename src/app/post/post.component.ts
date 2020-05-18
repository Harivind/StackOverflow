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
  public upvotedQues: boolean;
  public upvotedAns: boolean[];
  public downvotedQues: boolean;
  public downvotedAns: boolean[];

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
    if (this.user)
      this.currentUser = this.user.username;
    else
      this.currentUser = null
    console.log("current " + this.currentUser)
    this.qAndA.getPost(this.questionID).subscribe(data => {
      this.post = data
      console.log(data.question)
      this.upvotedQues = (data.question.upvotes.indexOf(this.currentUser) > -1)
      this.downvotedQues = (data.question.downvotes.indexOf(this.currentUser) > -1)
      this.upvotedAns = data.answers.map(a => a.upvotes.indexOf(this.currentUser) > -1)
      this.downvotedAns = data.answers.map(a => a.downvotes.indexOf(this.currentUser) > -1)
      console.log("profile " + this.post.question.profilePic)
    })
    // console.log(this.post.question.profilePic)
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
    console.log(answer)
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

  upvote(type: String, _id: String, i: number) {
    if (type == 'Question') {
      if (!this.upvotedQues)
        this.qAndA.upvote(type, _id, this.currentUser).subscribe(data => {
          let { profilePic } = this.post.question
          this.post.question = { ...data, profilePic: profilePic };
          this.downvotedQues = false
          this.upvotedQues = true
        })
    }
    else {
      if (!this.upvotedAns[i])
        this.qAndA.upvote(type, _id, this.currentUser).subscribe(data => {
          let { profilePic } = this.post.answers[i]
          this.post.answers[i] = { ...data, profilePic: profilePic }
          this.upvotedAns[i] = true
          this.downvotedAns[i] = false
        })
    }
  }

  downvote(type: String, _id: String, i: number) {
    if (type == 'Question') {
      if (!this.downvotedQues)
        this.qAndA.downvote(type, _id, this.currentUser).subscribe(data => {
          let { profilePic } = this.post.question
          this.post.question = { ...data, profilePic: profilePic };
          this.downvotedQues = true
          this.upvotedQues = false
        })
    }
    else {
      if (!this.downvotedAns[i])
        this.qAndA.downvote(type, _id, this.currentUser).subscribe(data => {
          let { profilePic } = this.post.answers[i]
          this.post.answers[i] = { ...data, profilePic: profilePic }
          this.upvotedAns[i] = false
          this.downvotedAns[i] = true
        })
    }
  }
}
