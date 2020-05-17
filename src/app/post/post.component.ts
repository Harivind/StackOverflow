import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { QandAService } from '../qand-a.service';
import { Post } from '../shared/post'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  public questionID: String;
  public post: Post;

  constructor(private qAndA: QandAService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.questionID = params['questionID'];
    });
  }

  ngOnInit(): void {
    this.qAndA.getPost(this.questionID).subscribe(data => this.post = data)
  }



}
