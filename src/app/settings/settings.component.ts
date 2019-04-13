import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SettingsService } from '../settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  city: string;
  code: string;
  units: boolean; 

  private static settingsValues: {} = {
    'LANGUAGE': ['EN', 'DE', 'HU', 'RO'],
    'FORECAST_PERIOD': ['FULL_DAY', 'DAYTIME'],
    'WIND_SPEED': ['KNOTS', 'KMH', 'MPH', 'MS'],
    'WIND_DIRECTION': ['ARROW', 'CARDINAL', 'DEGREE'],
    'TEMPERATURE': ['C', 'F'],
    'PRESSURE': ['HPA', 'MB', 'INCHES'],
    'PRECIPITATION': ['MM3H', 'IN3H'],
    'ALTITUDE': ['M', 'FT'],
    'LAPSE_RATE': ['C100M', 'F1000FT']
  };
  
  public getSettingsValues() {
    return SettingsService.SettingsValues;
  }

  private settingsKeys = Object.keys(this.settingsService.getSettingsValues());
  private settingsValues = this.settingsService.getSettingsValues();
  private currentSettings = {};

  constructor(private route:Router, private _settingsService:SettingsService) { }

  initSettings() {
    for (const key of this.settingsKeys) {
      this.currentSettings[key] = this._settingsService.getSetting(key);
    }
  }
  
  ngOnInit() {
    this.initSettings();
  }

  saveSetting(key: string, value: string) {
    this._settingsService.setSetting(key, value);
  }

  saveSettings(){
    let location={
      city:this.city,
      code:this.code,
    }
    let settings={
      units:this.units,
    }

    localStorage.setItem('location',JSON.stringify(location));
    localStorage.setItem('settings',JSON.stringify(settings));
    this.route.navigate(['home'])
  }
}
