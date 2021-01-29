import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InteractionRequiredAuthError, AuthError } from 'msal';

const weatherAPIEndpoint = "https://dauntlessapiservice.azurewebsites.net";

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile;
  testData;
  weatherData: WeatherForecast[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer  ${sessionStorage.getItem('msal.idtoken')}`
    })
  }

  constructor(private authService: MsalService, private http: HttpClient) { }

  ngOnInit() { }

  getTestData() {
    this.http.get(`${weatherAPIEndpoint}/test`, { responseType: 'text' }).subscribe(
      res => {
        console.log("Response: ", res)
        this.testData = res;
      }
    )
  }

  getTestWeatherData() {
    this.http.get(`${weatherAPIEndpoint}`, this.httpOptions).subscribe(
      (res: any[]) => {
        
        for (let i = 0; i < res.length; i++) {
          let d: WeatherForecast = res[i];
          this.weatherData.push(d);
          
        }
        console.log("Weather: ", this.weatherData);
        console.log("Response: ", res);
      }
    )
  }
}
