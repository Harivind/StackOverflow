import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

import { User } from "./shared/user";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  public user: User;
  _resp;
  constructor(private router: Router, private http: HttpClient) {
    //this.user.token= JSON.parse(localStorage.getItem("user"));
  }

  public get userValue(): User {
    return this.user;
  }

  login(user: User) {
    return this.http.post("/api/authenticate", this.user).subscribe((data) => {
      localStorage.setItem("user", JSON.stringify(user));
      alert(data);
      this.router.navigate(["/"]);
    });
  }

  logout() {
    localStorage.removeItem("user");
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
