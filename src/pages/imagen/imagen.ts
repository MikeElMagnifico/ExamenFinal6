import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'
/**
 * Generated class for the ImagenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagen',
  templateUrl: 'imagen.html',
})
export class ImagenPage {
  imagen;
  tipo;
  anchoc;
  anchot;
  cordx = 0;
  cordy = 0;
  storage: firebase.storage.Storage;
  db: firebase.firestore.Firestore; 
  user: firebase.User
  constructor(public navCtrl: NavController, public navParams: NavParams, public loading : LoadingController, private geo : Geolocation) {
    this.imagen = this.navParams.get('image')
    this.storage = firebase.storage();
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    this.geo.getCurrentPosition().then((resp)=>{
      this.cordy=resp.coords.latitude;
      console.log(resp.coords.latitude)
      this.cordx=resp.coords.longitude;
      console.log(resp.coords.longitude)
    }).catch((error) => {
    console.log('Error getting location', error);
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenPage');
  }
  subirImagen(){
    let imagen = {
      tipo : this.tipo,
      anchoc : this.anchoc,
      anchot : this.anchot,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      url: '',
      user: this.user.uid,
      cordx: this.cordx,
      cordy: this.cordy

    };

    let loading = this.loading.create({
      content: "Subiendo imagen..."
    });
    loading.present();

    
    this.db.collection('imagenes').add(imagen)
    .then(ref => {
      let ImagenNombre = ref.id;
      let uploadTask = this.storage.ref('imagenes/' + ImagenNombre + '.jpg').putString(this.imagen, 'data_url');
      uploadTask.then( out => {
        loading.dismiss()
        let url = out.downloadURL;
        ref.update({url: url});
        this.navCtrl.pop()
      })
      .catch( error => {
        console.log("Error")
      });
    })
    .catch(error => {
      console.log(JSON.stringify(error));
    });
  
    
  }
}
