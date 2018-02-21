import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { EdensPage } from '../pages/edens/edens';
import { ApiLesGermesProvider } from '../providers/ApiLesGermes';
import { AlertsProvider } from '../providers/Alerts';

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    HomePage,
    LoginPage,
    RegisterPage,
    EdensPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    HomePage,
    LoginPage,
    RegisterPage,
    EdensPage
  ],
  providers: [ApiLesGermesProvider, AlertsProvider, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
