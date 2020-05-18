import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, } from "@angular/forms";

import { QandAService } from '../qand-a.service';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  submitted: boolean;
  question: FormGroup;
  status: boolean;
  constructor(
    private formbuilder: FormBuilder,
    private qaService: QandAService,
  ) { }
  ngOnInit() {
    this.submitted = false;
    this.question = this.formbuilder.group({
      heading: ["", Validators.required],
      description: ["", Validators.required],
      user: [""],
    });
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

  postQuestion() {
    this.submitted = true;
    let user = JSON.parse(localStorage.getItem("user")).username;
    this.question.value.user=user
    this.question.value.images=this.base64textString
    this.qaService.postQuestion(this.question.value);

  }

  get formData() {
    return this.question.controls;
  }
}
