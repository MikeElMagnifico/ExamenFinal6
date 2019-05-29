import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';
import { LogPage } from '../pages/log/log';
export const config = {
  apiKey: "AIzaSyACspRSIYvjwHWjWguq74TBI5TmSmYbqFU",
  authDomain: "examenfinal-3981e.firebaseapp.com",
  databaseURL: "https://examenfinal-3981e.firebaseio.com",
  projectId: "examenfinal-3981e",
  storageBucket: "examenfinal-3981e.appspot.com",
  messagingSenderId: "218645046780",
  appId: "1:218645046780:web:cb8e74414429eac7"
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LogPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config)
  }
}

