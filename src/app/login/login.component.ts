import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AccountService],
})
export class LoginComponent implements OnInit {

  9
  constructor() { }

  ngOnInit(): void {
  }

}
