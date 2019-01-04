import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as moment from 'moment';
import { longStackSupport } from 'q';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  city:string;
  location={
    city: 'Budapest',
    code:'HU',
  };
  
  weather: any;
  weatherConditions: any;
  value: any;
  lat: any;
  lon: any;

  constructor(private _weatherService:WeatherService) {

   }

  ngOnInit() {
 


    this.value = localStorage.getItem('location');
    if (this.value!= null){
      this.location=JSON.parse(this.value);
    }else(
        this.location={
          city: 'Budapest',
          code:'HU',
        }
      )

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocationInfo);
      }
      
      function displayLocationInfo(position) {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
      
        console.log(`longitude: ${ lon } | latitude: ${ lat }`);
      }
      
    this._weatherService.getWeather(this.location.city,this.location.code).subscribe((response)=>{
      this.weather=response;
      console.log(this.weather); // to remove in the future
      this.weatherConditions={
        condition: this.weather.weather[0].description,
        temp: this.weather.main.temp,
        pressure: this.weather.main.pressure,
        humidity: this.weather.main.humidity,
        currentDate: moment.unix(this.weather.dt).format("DD-MM-YYYY HH:mm:ss"),
        sunrise: moment.unix(this.weather.sys.sunrise).format("HH:mm"),
        sunset: moment.unix(this.weather.sys.sunset).format("HH:mm"),
        daylight: ((this.weather.sys.sunset - this.weather.sys.sunrise)/3600).toFixed(2),
        visibility: this.weather.visibility,
        windSpeed: this.weather.wind.speed,
        windDirection: this.weather.wind.deg,
        iconCode: "http://openweathermap.org/img/w/" + this.weather.weather[0].icon + ".png", 
      }
      
    }); 
    this._weatherService.getWeatherGPS(this.lat,this.lon).subscribe((response)=>{
        this.weather=response;
        console.log(this.weather); // to remove in the future
        this.weatherConditions={
          condition: this.weather.weather[0].description,
          temp: this.weather.main.temp,
          pressure: this.weather.main.pressure,
          humidity: this.weather.main.humidity,
          currentDate: moment.unix(this.weather.dt).format("DD-MM-YYYY HH:mm:ss"),
          sunrise: moment.unix(this.weather.sys.sunrise).format("HH:mm"),
          sunset: moment.unix(this.weather.sys.sunset).format("HH:mm"),
          daylight: ((this.weather.sys.sunset - this.weather.sys.sunrise)/3600).toFixed(2),
          visibility: this.weather.visibility,
          windSpeed: this.weather.wind.speed,
          windDirection: this.weather.wind.deg,
          iconCode: "http://openweathermap.org/img/w/" + this.weather.weather[0].icon + ".png", 
        }
            
          });
    

  }
  saveChanges(){
    let location={
      city:this.city,
    }
    localStorage.setItem('location',JSON.stringify(location));
    window.location.reload();
  };
  
}

