import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'weather-app';

myFunction(){
      $("nav").toggleClass('drag-status');
      $("nav span").toggleClass('drag-status2');
      $("main").toggleClass('blur');
} 

swipeFunction (){
var swipeElement = document.getElementById('nav');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(swipeElement);

// listen to events...
mc.on("panleft panright tap press", function(ev) {
    console.log('swipe');
});
};
};