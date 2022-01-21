import { Component, NgZone, OnInit } from '@angular/core';
//import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
import { registerPlugin } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Geolocation } from '@capacitor/geolocation';
import { BGService } from '../services/bg.service';
import { Platform } from '@ionic/angular';
import { BackgroundGeolocationResponse } from '@awesome-cordova-plugins/background-geolocation';




//const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");
const started = Date.now();
const watcher_colours = {};
const colours = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "orange",
    "purple",
    "cyan"
];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  isCodeHidden = false;
  code //= "abcd"
  x= 0;
  y= 0;
  z= 0;
    watch: any;
    newlat: any = 0;
    newlng: any = 0;
    starbg = false;
    activateWatch: boolean = true;
    locations:BackgroundGeolocationResponse[] = [];
  constructor(
      private zone: NgZone,
      private bg: BGService,
      private plt: Platform
  ) {}
    ngOnInit(): void {

        this.bg.$starbg.subscribe(resp =>{
            this.starbg = resp;
        })
        this.bg.$storeLocation.subscribe(resp =>{
            this.locations = resp;
            console.log(this.locations.length)
        })

    try {
       if(this.plt.is('hybrid') ){
        Geolocation.requestPermissions();
       }
       
   } catch (error) {
       
   }
/*     this.motionServ.$acceleration.subscribe(acel =>{
        if (!acel)
            return;
        this.x = acel.x;
        this.y = acel.y;
        this.z = acel.z;      
        if(this.x > 1 || this.y > 1)  {
            alert(this.x + " " + this.x)
        }         
    }) */
    }

    /** Activar o desactivar mi localización */
    async toogleMyLocation(){    
        if(this.activateWatch){
            this.activateWatch = !this.activateWatch ;
            var options: PositionOptions ={
                enableHighAccuracy:true
            }      
        
            this.watch = await Geolocation.watchPosition(options,(position, err)=>{
                this.zone.run(() => {
                if(position){               
                    this.newlat = position.coords.latitude ;
                    this.newlng = position.coords.longitude ;                
                }
            });
            console.log("this.watch") 
            console.log(JSON.stringify(this.watch))      
            
        })
        }
        else{
            Geolocation.clearWatch({id:this.watch})
            this.activateWatch = !this.activateWatch ;
        }


        }

    startBg(){
        this.bg.init();
        //this.starbg = !this.starbg;
    }
    stop(){
        this.bg.stop();
        //this.starbg = !this.starbg;
    }
}
  

