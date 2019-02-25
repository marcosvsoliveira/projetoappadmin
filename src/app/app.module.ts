import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { OneSignal } from '@ionic-native/onesignal';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProvidersProvider } from '../providers/providers/providers';
import { OrcamentoProvider } from '../providers/orcamento/orcamento';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBmlrVigNr4QB8pRdxG7QhGpSCoWAA0xVE",
      authDomain: "appprojeto-8587e.firebaseapp.com",
      databaseURL: "https://appprojeto-8587e.firebaseio.com",
      projectId: "appprojeto-8587e",
      storageBucket: "appprojeto-8587e.appspot.com",
      messagingSenderId: "136091600796"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersProvider,
    OneSignal,
    OrcamentoProvider
  ]
})
export class AppModule {}
