import { Component, OnInit } from '@angular/core';

import { QandAService } from '../qand-a.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  constructor(qAndA: QandAService) { }

  ngOnInit(): void {
  }



}
