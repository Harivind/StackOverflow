import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators, } from "@angular/forms";

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
  status: boolean;
  constructor(
    private formbuilder: FormBuilder,
    private accService: AccountService
  ) { }
  ngOnInit() {
    this.submitted = false;
    this.user = this.formbuilder.group({
      // firstName: ["", Validators.required],
      // lastName: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.minLength(8)],
      profilePic: [""],
    });
  }
  base64textString:String;

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textString=('data:image/png;base64,' + btoa(e.target.result));
  }

  signup() {
    this.submitted = true;
    this.user.value.profilePic=this.base64textString;
    this.status = this.accService.register(this.user.value);
    console.log("signup status: " + this.status);
  }
  get formData() {
    return this.user.controls;
  }
}
