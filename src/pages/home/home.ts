import { Component } from '@angular/core';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { NavController, LoadingController } from 'ionic-angular';
import { ImagenPage } from '../imagen/imagen';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  img = ImagenPage
  user :firebase.User;
  db : firebase.firestore.Firestore;
  arboles = [];
  constructor(public navCtrl: NavController, public camera: Camera, public loading: LoadingController) {
    this.user = firebase.auth().currentUser;
    this.db = firebase.firestore();

    this.db.collection('imagenes').orderBy('timestamp', 'desc')
    .onSnapshot(query => {
      this.arboles = [];
      query.forEach(imagen =>{
        if(imagen.data().user == this.user.uid){
          this.arboles.push(imagen.data());
        }
      })
    })
  }

  getPicture(){
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options)
    .then(imagen =>{
      console.log('imagen capturada')
      this.navCtrl.push(this.img, {image : 'data:image/jpeg;base64,' + imagen})
    }, error => {
      console.log(JSON.stringify(error))
    });
  }

}
