import { Component } from '@angular/core';
import { ApiLesGermesProvider } from '../../providers/ApiLesGermes';
import { AlertsProvider } from '../../providers/Alerts';
import { LoadingController, NavController, Platform } from 'ionic-angular';

/*
  Generated class for the register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerEntry = {
    password: null,
    passwordCheck: null
  };

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public navCtrl: NavController,
    public apiLesGermes: ApiLesGermesProvider,
    public alerts: AlertsProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad registerPage');
  }

  registerForm() {
    let loader = this.loadingCtrl.create({
      content: "Inscription"
    });
    //Show the loading indicator
    loader.present();

    if (this.registerEntry.password == this.registerEntry.passwordCheck) {
      this.apiLesGermes.post("register", this.registerEntry, true).then(
        data => {
          loader.dismiss();
          if (data) {
            this.alerts.showSuccessAlert("Inscription réussie", "Register", () => { this.navCtrl.pop(); })
          } else {
            //This really should never happen
            console.error('Error Log in: no data');
          }
        },
        error => {
          //Hide the loading indicator
          loader.dismiss();
          console.error('Error Log in');
          console.dir(error);
          this.alerts.showErrorAlert(error, "Register");
        }
      );
    }
    else {
      loader.dismiss();
      this.alerts.showErrorAlert("Les mots de passe entrés sont différents. Veuillez réessayer", "Register");
    }
      
  }

}
