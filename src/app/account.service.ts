import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { DataSharingService } from "./data-sharing.service"

import { User } from "./shared/user";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  public user: User;
  _resp;
  constructor(private router: Router, private http: HttpClient, private dataSharingService: DataSharingService) {
    //this.user.token= JSON.parse(localStorage.getItem("user"));
  }

  public get userValue(): User {
    return this.user;
  }

  login(user: User) {
    console.log("Login accservice called")
    return this.http.post("http://localhost:3000/login", user).subscribe((data) => {
      this._resp = data;
      console.log(data)
      if (this._resp.status == 'Success') {
        console.log("Succesful Login")
        localStorage.setItem("user", JSON.stringify(this._resp.user));
        this.dataSharingService.isUserLoggedIn.next(true)
        this.router.navigate(["/"])
      }
      else
        alert("Invalid Credentials");
      // this.router.navigate(["/"]);
    });
  }

  logout() {
    localStorage.removeItem("user");
    this.dataSharingService.isUserLoggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  isLogedin() {
    if (localStorage.getItem("user")) return true;
    return false;
  }

  register(user: User) {
    this.http.post("http://localhost:3000/register", user).subscribe((data) => {
      this._resp = JSON.stringify(data);
      console.log(data);
      this._resp = JSON.parse(this._resp);
      localStorage.setItem("user", JSON.stringify(user));
      if (this._resp.status == "Success") this.router.navigate(["/login"]);
      else alert(this._resp.status);
    });
    console.log("thisssss:" + this._resp.status);
    console.log("======" + this._resp.status == "Success");
    if (this._resp.status == "Success") return true;
    console.log("WHHHYYY");
    return false;
  }

  getAll() {
    return this.http.get<User[]>("/api/users");
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
}
