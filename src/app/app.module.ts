import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthPage } from '../pages/auth/auth';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SkygearService } from './skygear.service';

import { User, Conversations } from '../providers/providers';

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage
  ],
  providers: [
    User,
    Conversations,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SkygearService
  ]
})
export class AppModule {}
