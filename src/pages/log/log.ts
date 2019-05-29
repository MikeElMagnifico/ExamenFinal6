import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import 'firebase/auth'
import { RegistroPage } from '../registro/registro';

/**
 * Generated class for the LogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage {

  home = HomePage;
  registro = RegistroPage;
  email = '';
  pass = '';
  auth: firebase.auth.Auth
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.auth = firebase.auth()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogPage');
  }
  login(){
    //this.navCtrl.push(this.home)
    console.log(this.email, this.pass)
    this.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then(data => {
      this.navCtrl.setRoot(this.home);
    })
    .catch(error => {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: error.message,
        buttons: ['Ok']
      });
      alert.present();

    }); 
  }

  signin(){
    this.navCtrl.push(this.registro)
  }

}
