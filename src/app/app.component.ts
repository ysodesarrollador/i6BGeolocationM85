/* import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
 */

import { Component } from '@angular/core';
import {  LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { BGService } from './services/bg.service';
//import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  interval:any;
  already: boolean = false;
  isActive: boolean;
  starbg: boolean;
  constructor(
    private alertCtrol: AlertController,
    //private backgroundMode: BackgroundMode,
    private bg : BGService
  ) {

    LocalNotifications.addListener("localNotificationActionPerformed", async (
      notification_1)=>{
        let id = String(notification_1.notification.id);
        var local: any =
            {
             notificationID:id,
             title:notification_1.notification.title,
             body:notification_1.notification.body,
             data:notification_1.notification.extra.data       
           } 
           alert("localNotificationActionPerformed")
      })

/*     LocalNotifications.addListener("localNotificationReceived", async (
      notification: LocalNotification)=>{                
        const alert = await this.alertCtrol.create({
          //cssClass: 'profalert',
          header:notification.title,
          subHeader: notification.body,
          buttons:['OK']
        });
        alert.present();
        alert.onDidDismiss().then(resp=>{
          //this.navCtrl.navigateForward(notification.extra.data)      
        }); 
      }) */

/*       Network.addListener('networkStatusChange', status => {
        console.log('Network status changed', status);
        if(!status.connected){
          this.bg.init();
        }
        else{
          //this.bg.stop();
        }
         
      });
      const logCurrentNetworkStatus = async () => {
        const status = await Network.getStatus();
      
        console.log('Network status:', status);
      }; */
      
/*       this.backgroundMode.enable();
      this.backgroundMode.on("activate").subscribe(()=>{
        this.backgroundMode.disableWebViewOptimizations();
        this.backgroundMode.disableBatteryOptimizations();
        if(!this.interval){
          this.interval = setInterval(async () => { 
            this.isActive = this.backgroundMode.isActive();
            console.log('backgroundMode is activate: ', this.isActive);
            let networkStatus = await Network.getStatus();
            console.log("this.already" , this.already); console.log(this.already)
            if((networkStatus.connected == false) && (this.already == false)){
              if( this.starbg == false){
                this.bg.init(true);
                this.already = true;
                //clearInterval(this.interval);
              }
            }
            else if((networkStatus.connected == true)  && (this.already == true)){
              this.bg.stop();
              this.already = false;
              this.bg.notification();
            }
            if(!this.isActive){
              //console.log("Stop Interval")
              //clearInterval(this.interval);
              this.already = false;
            }
            let time = new Date()
            console.log(time)
          }, 2000);
        }

        
        
        Network.addListener('networkStatusChange', status => {
          console.log('Network status changed', status);
        });
      });

      this.bg.$starbg.subscribe(resp =>{
        this.starbg = resp;
      }) */

  }
}
