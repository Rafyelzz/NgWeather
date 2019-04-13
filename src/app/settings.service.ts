import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private settingsObject = {}; // store settings of a session if localStorage is not available
  static forecastSettingsValues: any;
  static SettingsValues: any;

  private initSettingsObject() {
    // create settings object to store settings for session if localStorage is not available
    // settingsObject serves also as a fallback before the user sets any personal settings
    for (const key of Object.keys(SettingsService.forecastSettingsValues)) {
      this.settingsObject[key] = SettingsService.forecastSettingsValues[key][0];
    }
  }

  constructor() {
    this.initSettingsObject();
   }

   public isValidKey(key: string) {
    if (SettingsService.forecastSettingsValues.hasOwnProperty(key)) {
          return true;
        } else {
          return false;
        }
  }
  
  public isValidSetting(key: string, value: string) {
    if (SettingsService.forecastSettingsValues.hasOwnProperty(key) &&
        SettingsService.forecastSettingsValues[key].includes(value)) {
          return true;
        } else {
          return false;
        }
  }


   public getSetting(key: string): string {
    if (!this.isValidKey(key)) {
      console.log('settings-service.getForecastSetting() - key is invalid: ' + key);
      return '';
    }
  
    if ((typeof(Storage) !== 'undefined') && localStorage.getItem(key)) {
      return localStorage.getItem(key);
    } else {
      return this.settingsObject[key];
    }
  }
  
  public setSetting(key: string, value: string) {
  
    if (!this.isValidSetting(key, value)) {
      console.log('settings-service: {' + key + ': ' + value + '} setting was incorrect');
      return;
    }
  
    if ((typeof(Storage) !== 'undefined')) {
      localStorage.setItem(key, value);
    } else {
      this.settingsObject[key] = value;
    }
  }
}



