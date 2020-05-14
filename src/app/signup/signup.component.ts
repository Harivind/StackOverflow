import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  acc : AccountService;
  constructor() { }

  ngOnInit(): void {
  }

}
