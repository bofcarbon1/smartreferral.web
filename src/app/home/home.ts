import {Component, Inject} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {APP_BASE_HREF, 
  LocationStrategy, 
  HashLocationStrategy} from '@angular/common';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styles: [
    ` .navbar-nav a {
      color:black;
      font-weight:bold;
      font-size: .80em !important;
    }
    `
  ]
})


export class Home {
  
  constructor() {
   
  }
  
  ngOnInit() {
     
  }
 

}