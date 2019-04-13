import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey='6cfd7aa1981e6f51f811e830444ff70b';
  url;
  urlGPS;
  urlID;
  units;

  constructor(private http:Http) { 

    this.url='http://api.openweathermap.org/data/2.5/weather?q=',
    this.urlGPS='https://api.openweathermap.org/data/2.5/weather?',
    this.urlID='https://api.openweathermap.org/data/2.5/weather?id='
  } 

  getWeather(city,code, units){
    switch(units) {
      case 'metric':
        units = '&units=metric';
        break;
      case 'imperial':
        units = '&units=imperial';
        break;
      default:
    }
    return this.http.get(this.url+city+','+code+','+units+'&APPID='+this.apiKey)
    .pipe(map(res => res.json()));
  }

  getWeatherGPS(lat,long, units){
    switch(units) {
      case 'metric':
        units = '&units=metric';
        break;
      case 'imperial':
        units = '&units=imperial';
        break;
      default:
    }
    return this.http.get(this.urlGPS+'lat='+lat+'&lon='+long+units+'&APPID='+this.apiKey)
    .pipe(map(res => res.json()));
  }

  getWeatherbyID(id, units){
    switch(units) {
      case 'metric':
        units = '&units=metric';
        break;
      case 'imperial':
        units = '&units=imperial';
        break;
      default:
    }
    return this.http.get(this.urlID+id+units+'&APPID='+this.apiKey)
    .pipe(map(res => res.json()));

  }
} 
