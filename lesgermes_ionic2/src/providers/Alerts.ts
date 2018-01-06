import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the Alerts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertsProvider {

  constructor(public alertController: AlertController) {
    console.log('Hello Alerts Provider');
  }

  showAlert(message: string) {
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: 'Source: Log In',
      message: message,
      buttons: [{ text: 'Sorry' }]
    });
    alert.present();
  }

}
