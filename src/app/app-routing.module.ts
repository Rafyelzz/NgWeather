import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'settings',component:SettingsComponent, data: { title: 'Settings'} },
  { path:'home',component:HomeComponent, data: { title: 'Home'} },
  { path: '',  redirectTo: '/home',  pathMatch: 'full', data: {title: 'WeatherApp'}}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
