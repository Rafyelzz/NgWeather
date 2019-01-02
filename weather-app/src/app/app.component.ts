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

swipeFunction(){
  // Bind the swipeHandler callback function to the swipe event on div.box
  $( "nav" ).on( "swipe", swipeHandler );
 
  // Callback function references the event target and adds the 'swipe' class to it
  function swipeHandler( event ){
      $("nav").toggleClass('drag-status');
      $("nav span").toggleClass('drag-status2');
      $("main").toggleClass('blur');
  }
};
};