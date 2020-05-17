import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  hide = true;
  submitted: boolean;
  status: boolean;
  login: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private accService: AccountService
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.login = this.formbuilder.group({
      // firstName: ["", Validators.required],
      // lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  loginUser() {
    this.submitted = true;
    console.log(this.login.value)
    this.accService.login(this.login.value);
    console.log("signup status: " + this.status);

  }

  get formData() {
    return this.login.controls;
  }

}
