import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  http: HttpClient;
  constructor(private formbuilder:FormBuilder){
    http: HttpClient;
  }
  ngOnInit(){
    this.user = this.formbuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
    })
  }

  signup(){
    if(this.user.invalid){
      return;
    }
    this.submitted = true;
    this.http.post('/register',(JSON.stringify(this.user.value)));
  }
  submitted : boolean;
  user:FormGroup;

  get formData(){
    return this.user.controls;
  }


}
