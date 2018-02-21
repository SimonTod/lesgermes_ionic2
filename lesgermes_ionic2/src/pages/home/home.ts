import { Component } from '@angular/core';
import { ApiLesGermesProvider } from '../../providers/ApiLesGermes';
import { AlertsProvider } from '../../providers/Alerts';

import { LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { EdensPage } from '../edens/edens';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public justLoggedIn = false;

  constructor(
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public apiLesGermes: ApiLesGermesProvider,
    public alerts: AlertsProvider
  ) {
    this.justLoggedIn = navParams.get("justLoggedIn");
  }

  onLink(url: string) {
    window.open(url);
  }

  ionViewDidLoad() {
    //Once the main view loads
    //and after the platform is ready...
    //this.platform.ready().then(() => {
    //  //Setup a resume event listener
    //  document.addEventListener('resume', () => {
        
    //  });
      
    //});
    this.Loaded();
  }

  Loaded() {
    if (this.justLoggedIn) {
      this.apiLesGermes.get("user").then(
        data => {
          this.alerts.showSuccessAlert("Bienvenu " + data.name, "Home");
        },
        error => {
          this.alerts.showErrorAlert(error, "Home");
        }
      ).catch((err) => {
        this.alerts.showErrorAlert(err, "Home");
      });
    }
  }

  myEdens() {
    this.nav.push(EdensPage);
  }

  logout() {
    this.apiLesGermes.clearStorage();
    this.nav.setRoot(LoginPage);
  }

}
