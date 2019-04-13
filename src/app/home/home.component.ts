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
    id:'7284830',
  };
  settings={
    units: 'metric',
  };
  
  weather: any;
  weatherConditions: any;
  value: any;
  lat = 0;
  lon = 0;
  geolocationPosition: Position;


  constructor(private _weatherService:WeatherService) {

   }

  ngOnInit() {

    this.value = localStorage.getItem('location');
    if (this.value!= null){
      this.location=JSON.parse(this.value);
    }else(
        this.location={
          city:'Budapest',
          code:'HU',
          id:'7284830',
        }
      )
      

    this._weatherService.getWeather(this.location.city, this.location.code, this.settings.units).subscribe((response)=>{ 
      this.weather=response;
      console.log(this.weather); // to remove in the future
      this.weatherConditions={
        condition: this.weather.weather[0].description,
        temp: (this.weather.main.temp).toFixed(1),
        pressure: this.weather.main.pressure,
        humidity: this.weather.main.humidity,
        currentDate: moment.unix(this.weather.dt).format("DD-MM-YYYY HH:mm:ss"),
        sunrise: moment.unix(this.weather.sys.sunrise).format("HH:mm"),
        sunset: moment.unix(this.weather.sys.sunset).format("HH:mm"),
        daylight: ((this.weather.sys.sunset - this.weather.sys.sunrise)/3600).toFixed(2),
        visibility: ((this.weather.visibility)/1000),
        windSpeed: this.weather.wind.speed,
        windDirection: this.weather.wind.deg,
        iconCode: "http://openweathermap.org/img/w/" + this.weather.weather[0].icon + ".png", 
      }
    });
  }

  saveChanges(){
    let location={
      city:this.city,
      id:this.location.id,
    }
    localStorage.setItem('location',JSON.stringify(location));
    window.location.reload();
  };
  
  getGPSLocation(){
     
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.geolocationPosition = position,
                  this._weatherService.getWeatherGPS(position.coords.latitude, position.coords.longitude, this.settings.units).subscribe((response)=>{
                  this.weather=response;      
                  console.log(this.weather); // to remove in the future
                  this.location.id = this.weather.id;
                  this.saveChanges();
                  this.weatherConditions={
                    condition: this.weather.weather[0].description,
                    temp: (this.weather.main.temp).toFixed(1),
                    pressure: this.weather.main.pressure,
                    humidity: this.weather.main.humidity,
                    currentDate: moment.unix(this.weather.dt).format("DD-MM-YYYY HH:mm:ss"),
                    sunrise: moment.unix(this.weather.sys.sunrise).format("HH:mm"),
                    sunset: moment.unix(this.weather.sys.sunset).format("HH:mm"),
                    daylight: ((this.weather.sys.sunset - this.weather.sys.sunrise)/3600).toFixed(2),
                    visibility: ((this.weather.visibility)/1000),
                    windSpeed: this.weather.wind.speed,
                    windDirection: this.weather.wind.deg,
                    iconCode: "http://openweathermap.org/img/w/" + this.weather.weather[0].icon + ".png", 
                  }
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
            }
          })
        })
      }
    }
  }