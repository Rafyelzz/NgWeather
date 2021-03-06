import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Super Weather App';
  geolocationPosition: Position;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    
    // if (window.navigator && window.navigator.geolocation) {
    //   window.navigator.geolocation.getCurrentPosition(
    //       position => {
    //           this.geolocationPosition = position,
    //               console.log(position.coords.latitude)
    //       },
    //       error => {
    //           switch (error.code) {
    //               case 1:
    //                   console.log('Permission Denied');
    //                   break;
    //               case 2:
    //                   console.log('Position Unavailable');
    //                   break;
    //               case 3:
    //                   console.log('Timeout');
    //                   break;
    //           }
    //       }
    //   );
    // };


    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
  
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