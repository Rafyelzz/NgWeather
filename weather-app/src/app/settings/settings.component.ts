import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  city:string;
  code: string; 

  constructor(private route:Router) { }

  ngOnInit() {
  }

  saveChanges(){
    let location={
      city:this.city,
      code:this.code,
    }
    localStorage.setItem('location',JSON.stringify(location));
    this.route.navigate(['home'])
  }
}
