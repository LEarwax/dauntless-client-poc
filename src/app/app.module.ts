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
        clientId: 'c6e99c7d-8da1-4c5f-9ae6-37c49d3d1f2d',
        authority: 'https://login.microsoftonline.com/f7dc11ce-a7ef-4a98-81b2-d57f0bd15222',
        redirectUri: 'https://white-moss-0438ce71e.azurestaticapps.net'
      },
      cache: {
        //cacheLocation: 'localStorage',
        storeAuthStateInCookie: true, // set to true for IE 11
      },
    },
    {
      popUp: !isIE,
      consentScopes: [
        'api://39998322-19ea-42a5-aee0-d0a64f948b29/UserAccess'
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://ctlvr-nvmbr-api-appservice.azurewebsites.net', ['api://39998322-19ea-42a5-aee0-d0a64f948b29/UserAccess']]
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
