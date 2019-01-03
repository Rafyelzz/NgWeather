import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey='6cfd7aa1981e6f51f811e830444ff70b';
  url;

  constructor(private http:Http) { 

    this.url='http://api.openweathermap.org/data/2.5/weather?q='
  } 

  getWeather(city,code){
    return this.http.get(this.url+city+','+code+'&APPID='+this.apiKey)
    .pipe(map(res => res.json()));

  }

  getWeatherGPS(lat,long){
    return this.http.get(this.url+'lat='+lat+'&lon='+long+'&APPID='+this.apiKey)
  }
} 
