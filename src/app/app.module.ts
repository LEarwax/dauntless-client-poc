import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: '888234e7-4103-41ff-8c30-46e5884b6aa8',
        authority: 'https://login.microsoftonline.com/2fa92604-e557-4d4c-a240-f0df7d71bda8',
        redirectUri: 'http://localhost:4200/',
      },
      cache: {
        //cacheLocation: 'localStorage',
        storeAuthStateInCookie: true, // set to true for IE 11
      },
    },
    {
      popUp: !isIE,
      consentScopes: [
        'api://12da9937-a5db-4cd9-ba7b-b5d563153085/Weather.Conditions'
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://dauntless-api-poc.azure-api.net', ['api://12da9937-a5db-4cd9-ba7b-b5d563153085/Weather.Conditions']]
      ],
      extraQueryParameters: {}
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }