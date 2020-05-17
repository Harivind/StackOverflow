import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> ;

  constructor(){
    var log;
    if (localStorage.getItem("user")) log = true;
    else log= false;
    this.isUserLoggedIn = new BehaviorSubject<boolean>(log)
  }
}
