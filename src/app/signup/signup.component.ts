import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";

import { AccountService } from "../account.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})


export class SignupComponent implements OnInit {
  hide = true;
  submitted: boolean;
  user: FormGroup;
  status : boolean;
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private accServvice: AccountService
  ) {}
  ngOnInit() {
    this.submitted=false;
    this.user = this.formbuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["",  Validators.minLength(8)],
      profilePic: [""],
    });
  }

  signup() {
    this.submitted = true;
    this.status = this.accServvice.register(this.user.value);
    console.log("signup status: "+this.status);
  }
  get formData() {
    return this.user.controls;
  }
}
