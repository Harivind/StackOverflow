import { Component, OnInit } from '@angular/core';

import { Question } from '../shared/question';
import { Answer } from '../shared/answer';
import { User } from '../shared/user';
import { QandAService } from '../qand-a.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  questionsAsked : Question[];
  questionsAnswered : Question[];
  user:User;
  constructor(private qaService: QandAService) {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getQuestions();
   }

  ngOnInit(): void {
  }

  getQuestions(){
    this.qaService.getUserQuestions(this.user.username).subscribe((data:any) => {
      this.questionsAsked = data.askedQuestions;
      this.questionsAnswered = data.answeredQuestions;
    });
  }


}
