import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Home2Pipe } from './home-2.pipe';
import { BackgroundGeolocation } from '@awesome-cordova-plugins/background-geolocation/ngx';

@NgModule({
  declarations: [AppComponent, Home2Pipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BackgroundGeolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
