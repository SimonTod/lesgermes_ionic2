import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AlertsProvider } from '../../providers/Alerts';
import { ApiLesGermesProvider } from '../../providers/ApiLesGermes';

/*
  Generated class for the edens page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-edens',
    templateUrl: 'edens.html'
})
export class EdensPage {

    edens = [];

    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public alertController: AlertController,
      public alerts: AlertsProvider,
      public apiLesGermes: ApiLesGermesProvider,
      public loadingCtrl: LoadingController
    ) { }

    ionViewDidLoad() {
      console.log('ionViewDidLoad EdensPage');
      this.getUserEdens();
    }

    getUserEdens() {
      let loader = this.loadingCtrl.create({
        content: "Chargement"
      });
      //Show the loading indicator
      loader.present();

      this.apiLesGermes.get('user-edens').then(
        data => {
          if (data) {
            loader.dismiss();
            this.edens = data;
          }
          else {
            loader.dismiss();
            //This really should never happen
            console.error('Error Get Edens: no data');
          }
        },
        error => {
          //Hide the loading indicator
          loader.dismiss();
          console.error('Error Get Edens');
          console.dir(error);
          this.alerts.showErrorAlert(error, "Eden");
        }
      )
    }

    showAddEden() {
      let alert = this.alertController.create({
        title: 'Ajouter un Eden',
        inputs: [
          {
            name: 'eden_id',
            placeholder: 'ID Eden',
            
          }
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          },
          {
            text: 'Ajouter',
            handler: data => {
              if (data.eden_id == '') {
                this.alerts.showErrorAlert("Veuillez entrer l'ID de votre Eden", 'Eden');
              }
              else {
                this.addEden(data.eden_id);
              }
            }
          }
        ]
      })
      alert.present();
    }

    addEden(eden_id: string) {
      let loader = this.loadingCtrl.create({
        content: "Ajout d'un Eden"
      });
      //Show the loading indicator
      loader.present();

      this.apiLesGermes.post('register-eden', { eden_id: eden_id }).then(
        data => {
          if (data) {
            loader.dismiss();
            this.alerts.showSuccessAlert('Eden Ajouté', 'Eden', () => { this.getUserEdens(); });
          }
          else {
            loader.dismiss();
            //This really should never happen
            console.error('Error Add Eden: no data');
          }
        },
        error => {
          //Hide the loading indicator
          loader.dismiss();
          console.error('Error Add Eden');
          console.dir(error);
          this.alerts.showErrorAlert(error, "Eden");
        }
      );
    }

}
