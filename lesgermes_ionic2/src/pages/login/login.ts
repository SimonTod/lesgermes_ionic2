import { Component } from '@angular/core';
import { ApiLesGermesProvider } from '../../providers/ApiLesGermes';
import { AlertsProvider } from '../../providers/Alerts';
import { LoadingController, NavController, Platform, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/*
  Generated class for the login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginEntry = {};

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiLesGermes: ApiLesGermesProvider,
    public alerts: AlertsProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad loginPage');
  }

  loginForm() {
    let loader = this.loadingCtrl.create({
      content: "Trying to log in"
    });
    //Show the loading indicator
    loader.present();

    this.apiLesGermes.post("login", this.loginEntry, true).then(
      data => {
        if (data) {
          this.apiLesGermes.saveApiOauthInfo(data);
          let getTokenBody = {
            'grant_type': "password",
            'client_id': data.client.id,
            'client_secret': data.client_secret,
            'username': data.user.email,
            'password': data.password,
            'scope': null
          };
          this.apiLesGermes.getApiToken(getTokenBody).then((result) => {
            if (result.success == true) {
              loader.dismiss();
              this.navCtrl.setRoot(HomePage, { justLoggedIn: true });
            }
            else {
              loader.dismiss();
              this.alerts.showAlert(data.message);
            }
          });
        } else {
          loader.dismiss();
          //This really should never happen
          console.error('Error Log in: no data');
        }
      },
      error => {
        //Hide the loading indicator
        loader.dismiss();
        console.error('Error Log in');
        console.dir(error);
        this.alerts.showAlert(error);
      }
    );
  }

}
