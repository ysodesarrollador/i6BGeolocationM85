import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation,
   BackgroundGeolocationConfig,
    BackgroundGeolocationEvents,
     BackgroundGeolocationResponse
     } from '@awesome-cordova-plugins/background-geolocation/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { BehaviorSubject, Observable } from 'rxjs';

const config: BackgroundGeolocationConfig = {
  desiredAccuracy: 10,
  stationaryRadius: 20,
  distanceFilter: 50,
  debug: false, //  enable this hear sounds for background-geolocation life-cycle.
  stopOnTerminate: false, // enable this to clear background location settings when the app terminates,
  notificationTitle: "Distancia estimada",
  notificationText: "50 metros según la notificación",
  interval:6000,
  fastestInterval:5000,
};
const keyGeo = '_storeLocation';
@Injectable({
  providedIn: 'root'
})
export class BGService {
  storeLocationNoObs : BackgroundGeolocationResponse[] = []
  private _storeLocation = new BehaviorSubject<BackgroundGeolocationResponse[]>([]);
  
  public set storeLocation(v : BackgroundGeolocationResponse[] ) {
/*     let storeLocation = JSON.parse(localStorage.getItem(keyGeo));
    if(!storeLocation)
      storeLocation = [];
    storeLocation.push(v);
    localStorage.setItem(keyGeo,  JSON.stringify(storeLocation));
    this._storeLocation.next(storeLocation); */
    this._storeLocation.next(v); 
  }

  public get $storeLocation() : Observable<BackgroundGeolocationResponse[]> {
    return this._storeLocation.asObservable();
  }
  
  private _starbg = new BehaviorSubject<boolean>(false);
  
  public set starbg(v : boolean) {
    this._starbg.next(v);
  }
  
  public get $starbg() : Observable<boolean>{
    return this._starbg.asObservable();
  }
  
  
  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private zone: NgZone
  ) {
    let stored = JSON.parse(localStorage.getItem(keyGeo));
    if(!stored)
      return
    this._storeLocation.next(stored);
   }

  init(notif:boolean = false){
    if(notif)
      LocalNotifications.schedule({
        notifications: [
          {
            id:111,
            title:"Perdió la conexión a Internet",
            body:"Background Geolocation Habilitdado",            
            extra: {
              data:'localNotificationActionPerformed'
            }
          }
          ]
      });
      //localStorage.setItem(keyGeo,  JSON.stringify(null));
      this.backgroundGeolocation.configure(config)
    .then(() => {
      //this.zone.run(()=>{
        this.starbg = true;
      //})
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log("La Locationn:" + JSON.stringify(location));
        this.zone.run(()=>{
          this.storeLocationNoObs.push(location);
          this.storeLocation = this.storeLocationNoObs;
        })
        LocalNotifications.schedule({
          notifications: [
            {
              id:111,
              title:"Posicionamiento:",
              body:location.latitude + ":" + location.longitude,            
              extra: {
                data:'localNotificationActionPerformed'
              }
            }
          ]
        });
        //this.backgroundGeolocation.finish(); // FOR IOS ONLY

      });
    });
  
  // start recording location
    this.backgroundGeolocation.start();
    

  }

  stop(){
   
    this.zone.run(()=>{
      this.starbg = false;
      try {
        this.backgroundGeolocation.stop();
      } catch (error) {
        
      }
    })

  }

  notification(){
    LocalNotifications.schedule({
      notifications: [
        {
          id:111,
          title:"Está conectado a Internet",
          body:"Background Geolocation Deshabilitdado",            
          extra: {
            data:'localNotificationActionPerformed'
          }
        }
        ]
    });
  }
}
