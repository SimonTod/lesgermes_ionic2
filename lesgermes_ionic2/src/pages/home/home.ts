import { Component } from '@angular/core';
import { ApiLesGermesProvider } from '../../providers/ApiLesGermes';
import { AlertsProvider } from '../../providers/Alerts';

import { LoadingController, NavController, NavParams, Platform } from 'ionic-angular';

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
          this.alerts.showAlert("Bienvenu " + data.name);
        },
        error => {
          this.alerts.showAlert(error);
        }
      ).catch((err) => {
        this.alerts.showAlert(err);
      });
    }
  }

}
