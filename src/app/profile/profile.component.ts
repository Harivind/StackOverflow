import { Component, OnInit } from '@angular/core';

import { Question } from '../shared/question';
import { Answer } from '../shared/answer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  questions : Question[];
  answer : Answer[];
  constructor() { }

  ngOnInit(): void {
  }

}
