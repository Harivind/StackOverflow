import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators,} from "@angular/forms";

import { QandAService } from '../qand-a.service';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  submitted: boolean;
  question: FormGroup;
  status : boolean;
  constructor(
    private formbuilder: FormBuilder,
    private qaService: QandAService,
  ) {}
  ngOnInit() {
    this.submitted=false;
    this.question = this.formbuilder.group({
      heading: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  postQuestion() {
    this.submitted = true;
    this.status = this.qaService.postQuestion(this.question.value);
    console.log("Question status: "+this.status);

  }

  get formData() {
    return this.question.controls;
  }
}
