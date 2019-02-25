import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { OneSignal } from '@ionic-native/onesignal';
 
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              // private oneSignal: OneSignal
              ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      // this.configurePushNotification();
    });
  }

  // configurePushNotification(){
  //   window["plugins"].OneSignal.startInit('9f2bf7ef-a46b-4381-9ddc-a4c96f3afd3c', '136091600796');
  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

  //   this.oneSignal.handleNotificationReceived().subscribe(() => {
  //   // do something when notification is received
  //   });

  //   this.oneSignal.handleNotificationOpened().subscribe(() => {
  //     // do something when a notification is opened
  //   });

  //   this.oneSignal.endInit();
  // }
}

